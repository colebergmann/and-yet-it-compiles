//
//  ViewController.swift
//  MagicMins
//
//  Created by Cole Bergmann on 5/10/19.
//  Copyright © 2019 Cole Bergmann. All rights reserved.
//

import UIKit
import Charts

class ViewController: UIViewController {

    @IBOutlet var chartView: UIView!
    var lcv:LineChartView = LineChartView()
    @IBOutlet var changeRideButton: UIButton!
    
    let SIDE_PAD_PX:CGFloat = 5;
    let VERTICAL_PAD_PX: CGFloat = 5;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let viewRect: CGRect = chartView.frame
        
        lcv = LineChartView(frame: viewRect)
        chartView.addSubview(lcv)
        
        let points:[Double] = [70, 64, 64, 70, 64, 72, 62, 58, 64, 70, 64, 74, 74, 66, 58, 67, 71, 72, 62, 58, 64, 70, 64, 72, 72, 59, 67, 69, 73, 70, 60, 67, 68, 71, 69, 59, 49, 56, 53, 51, 42, 57, 58, 60, 57, 58, 59, 61, 66, 60, 59, 60, 63, 67, 61, 57, 65, 68, 71, 65, 59, 71, 74, 73, 69, 58, 75, 76, 77, 70, 61, 75, 77, 78, 69, 63, 70, 74, 74, 66, 58, 67, 71, 72, 62, 58, 64, 70, 64, 59 ]
        
        setChart(values: points)
        
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
    }
    
    @objc(LineChartFormatter)
    public class LineChartFormatter: NSObject, IAxisValueFormatter
    {
        public func stringForValue(_ value: Double, axis: AxisBase?) -> String
        {
            print(value)
            if (Int(value)%6 != 0) {
                return "";
            }
            let hour = 8 + (Int(value) % 6)
            if (hour == 24) {
                return "12AM"
            }
            if (hour == 12) {
                return "12PM"
            }
            if (hour < 12) {
                return "\(hour)AM";
            }
            return "\(hour-12)PM";
        }
    }
    
    func setChart(values: [Double]) {
        lcv.translatesAutoresizingMaskIntoConstraints = false
        lcv.animate(xAxisDuration: 0.0, yAxisDuration: 1.4, easingOption: .easeInExpo)
        var lineChartEntry  = [ChartDataEntry]() //this is the Array that will eventually be displayed on the graph.
        
        let formato:LineChartFormatter = LineChartFormatter()
        let xaxis:XAxis = XAxis()
        
        //here is the for loop
        for i in 0..<values.count {
            
            let value = ChartDataEntry(x: Double(i), y: values[i]) // here we set the X and Y status in a data chart entry
            formato.stringForValue(Double(i), axis: xaxis)
            lineChartEntry.append(value) // here we add it to the data set
        }
        
        xaxis.valueFormatter = formato
        lcv.xAxis.valueFormatter = xaxis.valueFormatter
        
        let line1 = LineChartDataSet(entries: lineChartEntry, label: "Number") //Here we convert lineChartEntry to a LineChartDataSet
        let data = LineChartData() //This is the object that will be added to the chart
        line1.colors = [.blue]
        line1.mode = .cubicBezier
        line1.cubicIntensity = 0.2
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
        lcv.highlightPerTapEnabled = false
        line1.drawValuesEnabled = false
        
        lcv.dragEnabled = false
        lcv.pinchZoomEnabled = false
        lcv.setScaleEnabled(false)
        
        lcv.xAxis.labelCount = 15
        lcv.xAxis.avoidFirstLastClippingEnabled = false
        
        
        
        data.addDataSet(line1) //Adds the line to the dataSet
        lcv.data = data //finally - it adds the chart data to the chart and causes an update
    }


}

