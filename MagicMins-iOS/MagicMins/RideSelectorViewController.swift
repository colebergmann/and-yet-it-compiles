//
//  RideSelectorViewController.swift
//  MagicMins
//
//  Created by Cole Bergmann on 5/15/19.
//  Copyright © 2019 Cole Bergmann. All rights reserved.
//

import UIKit

class RideSelectorViewController: UIViewController, UITableViewDelegate, UITableViewDataSource {
    @IBOutlet var table: UITableView!
    static let names = ["Star Tours – The Adventures Continue",
    "it’s a small world",
    "Pirates of the Caribbean",
    "Big Thunder Mountain Railroad",
    "Indiana Jones™ Adventure",
    "Matterhorn Bobsleds",
    "Space Mountain",
    "Haunted Mansion",
    "Splash Mountain"]
    
    var id = 0
    
    var mainVC : ViewController?
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return RideSelectorViewController.names.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = table.dequeueReusableCell(withIdentifier: "cell")!
        cell.textLabel?.text = RideSelectorViewController.names[indexPath.row]
        if (indexPath.row == id) {
            cell.accessoryType = .checkmark
        } else {
            cell.accessoryType = .none
        }
        return cell
    }
    
     func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        table.deselectRow(at: indexPath, animated: true)
        self.dismiss(animated: true, completion: nil)
        mainVC!.setRide(id: indexPath.row)
        UIApplication.shared.statusBarStyle = .lightContent
    }
    

    override func viewDidLoad() {
        super.viewDidLoad()
        UIApplication.shared.statusBarStyle = .default
        // Do any additional setup after loading the view.
        table.delegate = self
        table.dataSource = self
    }

}
