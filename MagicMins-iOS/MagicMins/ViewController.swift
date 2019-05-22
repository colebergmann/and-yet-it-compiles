//
//  ViewController.swift
//  MagicMins
//
//  Created by Cole Bergmann on 5/10/19.
//  Copyright © 2019 Cole Bergmann. All rights reserved.
//

import UIKit
import Charts
import Alamofire

class ViewController: UIViewController {

    @IBOutlet var chartView: UIView!
    var lcv:LineChartView = LineChartView()
    @IBOutlet var changeRideButton: UIButton!
    @IBOutlet var rideTitle: UILabel!
    @IBOutlet var rideMessage: UILabel!
    
    var currentRide = 0
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        UIApplication.shared.statusBarStyle = .lightContent
        
        let viewRect: CGRect = chartView.frame
        
        lcv = LineChartView(frame: viewRect)
        chartView.addSubview(lcv)
        
        
        // Setup gradient background
        let gradientView = UIView(frame: CGRect(x: 0, y: 0, width:self.view.frame.width, height:self.view.frame.height))
        let gradient = CAGradientLayer()
        gradient.frame = view.bounds
        gradient.colors = [UIColor(red: 88/255.0, green: 163/255.0, blue: 227/255.0, alpha: 1).cgColor, UIColor(red: 72.0/255.0, green: 92/255.0, blue: 221/255.0, alpha: 1).cgColor]
        view.layer.insertSublayer(gradient, at: 0)
        self.view.addSubview(gradientView)
        self.view.sendSubviewToBack(gradientView)
        
        // Add shadow to button
        changeRideButton.layer.shadowColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.25).cgColor
        changeRideButton.layer.shadowOffset = CGSize(width: 0.0, height: 2.0)
        changeRideButton.layer.shadowOpacity = 1.0
        changeRideButton.layer.shadowRadius = 0.0
        changeRideButton.layer.masksToBounds = false
        changeRideButton.layer.cornerRadius = 4.0
        
        let marker:BalloonMarker = BalloonMarker(color: UIColor.black, font: UIFont(name: "Helvetica", size: 12)!, textColor: UIColor.white, insets: UIEdgeInsets(top: 7.0, left: 7.0, bottom: 7.0, right: 7.0))
        marker.minimumSize = CGSize(width: 75.0, height: 35.0)
        lcv.marker = marker
        
        setRide(id: 0)
    }
    
    func setRide(id: Int) {
        self.setChart(vals: Array(repeating: 0, count: 90))
        currentRide = id
        rideTitle.text = RideSelectorViewController.names[id]
        rideMessage.text = "Loading...\n\n\n"
        
        Alamofire.request("https://colebergmann.com:5000/graph/\(id)", method: .get)
            .responseJSON { response in
                switch response.result {
                case .success:
                    if let result = response.result.value {
                        let res = result as! NSDictionary
                        let arr = res["array"] as! [Double]
                        self.setChart(vals: arr)
                        self.updateSubtext(data: arr, currentIndex: res["predIndex"] as! Int)
                    } else {
                        self.showError(error: "API returned an unexpected response")
                    }
                case .failure(let error):
                    self.showError(error: error.localizedDescription)
                }
        }
    }
    
    func updateSubtext(data: [Double], currentIndex: Int) {
        //Set limit line
        if lcv.xAxis.limitLines.count > 0 {
            lcv.xAxis.removeLimitLine(lcv.xAxis.limitLines[0])
        }
        let lim = ChartLimitLine(limit: Double(currentIndex), label: "")
        lcv.xAxis.addLimitLine(lim)
        
        //Iterate over the max and find the shortest wait time
        var absoluteMin = currentIndex
        var firstMin = currentIndex
        
        let waitNow = data[currentIndex]
        
        var periodTotal = 0
        for i in currentIndex ... 89 {
            periodTotal += Int(data[i])
            if (data[i] < (data[currentIndex] - 5) && firstMin == currentIndex) {
                firstMin = i
            }
            
            if (data[i] < data[absoluteMin]) {
                absoluteMin = i
            }
        }
        let periodAvg = 0
        if (currentIndex != 89) {
            periodTotal / (89-currentIndex)
        }
        
        var message = ""
        
        if (periodAvg < Int(waitNow)) {
            message += "Lines are long right now."
        } else {
            message += "Now is a great time to go."
        }
        
        if (absoluteMin == currentIndex) {
            message += " The lines are expected to be much longer throughout the day."
        } else {
            // handle firstMin and latestMin cases
            let minTime = indexToTime(i: absoluteMin)
            if (currentIndex == firstMin) {
                message += " The wait time isn't expected to get much shorter throughout the day, but it will reach an absolute minimum at \(minTime)."
            } else {
                message += " The wait time is expected to start decreasing substantially in about \((firstMin - currentIndex) * 10) minutes, reaching an absolute minimum at \(minTime)."
            }
            
        }
        rideMessage.text = message
        
    }
    
    func indexToTime(i: Int) -> String{
        let index = i + 6*8
        let hours = index/6
        var minutes = String((index % 6) * 10)
        if (minutes == "0") {minutes = "00"}
        if (hours < 12) {
            return "\(hours):\(minutes) PM"
        } else if (hours == 12) {
            return "\(hours):\(minutes) PM"
        } else {
            return "\(hours-12 ):\(minutes) PM"
        }
    }
    
    func showError(error: String) {
        let errorMessage = UIAlertController(title: "Network Error", message: error, preferredStyle: .alert)
        errorMessage.addAction(UIAlertAction(title: "Dismiss", style: .cancel, handler: nil))
        self.present(errorMessage, animated:true)
    }
    
    
    
    @objc(LineChartFormatter)
    public class LineChartFormatter: NSObject, IAxisValueFormatter
    {
        public func stringForValue(_ value: Double, axis: AxisBase?) -> String
        {
            /*
            print(value)
            var hour = 8 + (Int(value) / 6)
            let minute = (Int(value) % 60) * 10
            if (hour > 12) {
                hour -= 12
            }
            */
            
            // TODO: Make this accurately return the x-axis. Currently just using a label in the storyboard.
            return ""
        }
    }
    
    func setChart(vals: [Double]) {
        var values = vals
        for i in 0...values.count - 1 {
            if (values[i] < 0) {
                values[i]=0
            }
        }
        
        lcv.clearAllViewportJobs()
        lcv.clearValues()
        lcv.clear()
        
        lcv.translatesAutoresizingMaskIntoConstraints = false
        lcv.animate(xAxisDuration: 0.0, yAxisDuration: 1.4, easingOption: .easeInExpo)
        var lineChartEntry  = [ChartDataEntry]() //this is the Array that will eventually be displayed on the graph.
        
        let formato:LineChartFormatter = LineChartFormatter()
        let xaxis:XAxis = XAxis()
        
        //here is the for loop
        for i in 0..<values.count {
            
            let value = ChartDataEntry(x: Double(i), y: values[i]) // here we set the X and Y status in a data chart entry
            lineChartEntry.append(value) // here we add it to the data set
        }
        
        xaxis.valueFormatter = formato
        lcv.xAxis.valueFormatter = xaxis.valueFormatter
        
        let line1 = LineChartDataSet(entries: lineChartEntry, label: "Number") //Here we convert lineChartEntry to a LineChartDataSet
        let data = LineChartData() //This is the object that will be added to the chart
        
        line1.drawFilledEnabled = true
        line1.colors = [.blue]
        line1.fillColor = .cyan
        
        line1.mode = .cubicBezier
        line1.cubicIntensity = 0.2
        line1.fillColor = .blue
        line1.drawCirclesEnabled = false
        lcv.topAnchor.constraint(equalTo: chartView.topAnchor).isActive = true
        lcv.bottomAnchor.constraint(equalTo: chartView.bottomAnchor).isActive = true
        lcv.leadingAnchor.constraint(equalTo: chartView.leadingAnchor).isActive = true
        lcv.trailingAnchor.constraint(equalTo: chartView.trailingAnchor).isActive = true
        data.setDrawValues(false)
        
        lcv.xAxis.centerAxisLabelsEnabled = true
        
        lcv.xAxis.labelPosition = .bottom
        lcv.xAxis.drawGridLinesEnabled = false
        lcv.chartDescription?.enabled = false
        lcv.legend.enabled = false
        lcv.rightAxis.enabled = false
        lcv.leftAxis.drawGridLinesEnabled = false
        //lcv.highlightPerTapEnabled = false
        
        line1.drawValuesEnabled = false
        
        //lcv.dragEnabled = false
        lcv.pinchZoomEnabled = false
        lcv.setScaleEnabled(false)
        
        
        //lcv.xAxis.avoidFirstLastClippingEnabled = false
        lcv.xAxisRenderer.computeAxisValues(min: 0, max: 89)
        
        data.addDataSet(line1) //Adds the line to the dataSet
        lcv.data = data //finally - it adds the chart data to the chart and causes an update
    }
    @IBAction func changeRide(_ sender: Any) {
        let newVC = self.storyboard?.instantiateViewController(withIdentifier: "selector") as! RideSelectorViewController
        newVC.id = currentRide
        newVC.mainVC = self
        self.present(newVC , animated: true)
    }
    

}

