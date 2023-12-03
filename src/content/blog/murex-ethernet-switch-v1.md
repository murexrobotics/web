---
title: 'MUREX Ethernet Switch V1'
description: 'We have a grand vision: to democratize technology for all. Despite being just a high school robotics team, MUREX strives to uphold that standard in every way possible. In a recent project regarding the networking system of our underwater ROV, we have yet again made another stride towards our ambitious dream.'
author: 'Byran Huang and Max Liu'
pubDate: 'Dec 2 2023'
heroImage: '/blogs/murex-ethernet-switch-v1/photo9.jpg'
draft: 'NO'
---

_MUREX Robotics is Phillips Exeter Academy’s High School Underwater Robotics Team competing in the MATE Underwater ROV Competition._


We have a grand vision: to democratize technology for all. Despite being just a high school robotics team, MUREX strives to uphold that standard in every way possible. In a recent project regarding the networking system of our underwater ROV, we have yet again made another stride towards our ambitious dream.

While designing the new electrical system for the MUREX ROV, we realized the need for an embedded (and small) Ethernet switch, connecting our custom CM4-based control board, PLC module, and vision system –– consisting of multiple IP cameras –– together. Instinctively, we first turned towards the internet in search of a performant and affordable solution.

Unfortunately, that search was to no avail. The 5-port [Ethernet switch](https://bluerobotics.com/store/comm-control-power/tether-interface/ethswitch/) made by Blue Robotics, a major sponsor of the MATE ROV Competition, costs a whopping $175 per unit! The [SwitchBlox](https://botblox.io/products/small-ethernet-switch), made by UK-based BotBlox specializing in Ethernet solutions, doesn’t do much better with $72. Finally, we found [Allbord](http://www.szallbord.com/detail/5koubaizhaogongyejijiaohuanjimokuai.html), another company offering cheap but robust switches. Sadly, they are based in Shenzhen, China.

So, we decided to take matters into our own hands (as usual)...

After extensive research over the summer and intermittent work by our budding electrical team throughout fall term, we present the [MUREX Ethernet Switch](https://docs.murexrobotics.com/elec/boards/networking/switch): a 5-port unmanaged Fast Ethernet (100BASE-TX) switch, compliant with the IEEE 802.3u standard and matching commercial solutions in size and performance. Additionally, the BOM costs just under $15 per unit! Most importantly, it is [fully open-source](https://github.com/murexrobotics/electrical-2024/tree/main/networking/switch), so that anyone can follow and improve upon our solution.

![](/blogs/murex-ethernet-switch-v1/photo5.jpg)

*It works!*

```c
>>> Testing Conditions
Two Gigabit enabled computers
running iperf 2.1.9
one serving as local network DHCP host
connected through
MUREX Ethernet Switch
// TCP window size: 162 KByte (default)
>>> Results
Bandwidth (host): 94.1 Mbits/sec
Bandwidth (client): 94.4 Mbits/sec
Total Transfer: 113 MBytes
```

In this brief post we hope to share our design process, as well as note the various insights and mistakes we made along the way. We are no experts, however, so we hope that our readers (yes, you!) will also embrace the open-source spirit and comment any ideas or feedback down below. Let’s get started.

## Design Rationale

The IC of choice must be robust, easy to use, and widely available. Of course, a low price tag is also very beneficial. MUREX selected the IP175G due to its availability and commonality in embedded applications, although similar ICs like the [RTL8305NB-CG](https://www.realtek.com/en/products/communications-network-ics/item/rtl8305nb-cg) could also be [used](https://oshwhub.com/ay08/2-kou-bai-zhao-jiao-huan-ji). The pin-compatible IP175GHI can be used in harsh conditions with wider temperature ranges than the IP175G – perhaps a new version down the road?

![](/blogs/murex-ethernet-switch-v1/photo1.jpg)

The datasheet of the IP175G was very difficult to read, in part due to misspellings and very graphical diagrams. Worst of all, there was no sample implementation schematic. Although we pieced together most of the chip’s required passives and design considerations, a reference schematic helped cement it. After much searching with DuckDuckGo (Google didn’t index this website), we found [this](http://www.yutai-elec.com/data/upload/202003/1584407491182034.pdf).

To make this a truly “embedded” ethernet switch, MUREX opted for external magnetics to a connector for smaller sizing. The board-to-wire connector from the ethernet switch should be compact, locking and directional. We went with the simple and obvious choice, the [Molex PicoBlade](https://www.molex.com/en-us/products/connectors/wire-to-board-connectors/picoblade-connectors) connector. Since this is a “Fast” (100BASE-TX) ethernet switch and _not_ a Gigabit (1000BASE-TX) ethernet switch, there are only two differential pairs.

![alt_text](/blogs/murex-ethernet-switch-v1/image4.png "image_tooltip")

Great, we now know what we’re doing! Let’s make the schematic in KiCAD Nightly.

## Schematic Design

A day or two later, we spun up a design in KiCAD, largely following the standard implementation with a few features and modifications, namely:

* Magnetics
  * We scoured JLCPCB’s SMT parts library for the most fitting external magnetics, ultimately settling on the QT24A23 and BT16A07. _Note: when it came time to order, the BT16A07 was out of stock so it was replaced with the HY601680._

![alt_text](/blogs/murex-ethernet-switch-v1/image3.png "image_tooltip")

![](/blogs/murex-ethernet-switch-v1/photo3.jpg)

* LDO
  * We implemented a constant [3.3V output LDO](https://www.ti.com/lit/ds/symlink/lm1117.pdf) with a maximum voltage input of 15V (12V nominal).

![alt_text](/blogs/murex-ethernet-switch-v1/image5.png "image_tooltip")

![](/blogs/murex-ethernet-switch-v1/photo2.jpg)

* Configuration jumpers
  * For quicker configuration, all the initial setting pins have solder jumpers located on the back.

![alt_text](/blogs/murex-ethernet-switch-v1/image6.png "image_tooltip")

* [Bob Smith Style Termination](https://resources.altium.com/p/bob-smith-termination-it-correct-ethernet)
  * After a lot of research and discussion, we settled on a variation of the standard Ethernet grounding strategy, where the large MLCC capacitor terminates to _nothing_. This means that there is no copper other than the differential pairs in the region between the magnetics and the connectors. (On our PCB, we have ground planes around the differential pairs as our impedance calculations were coplanar)
  * To be frank, there is no “right” method to Ethernet grounding. Some application notes recommend grounding everything between the magnetics to the connector to CGND, while others tie CGND to DGND with a capacitor.
  * Each method provides different benefits in terms of isolation and noise isolation, but we ultimately chose to terminate to nothing due to its simplicity and reliability.
    * This method is recommended by the Renesas industrial Ethernet application notes as well as 10/100 Ethernet ICs like the LAN8742.
  * [This video](https://www.youtube.com/watch?v=39x8C_yf-FE) (also by Zach Peterson) covers all types of Ethernet grounding in a nutshell.

![alt_text](/blogs/murex-ethernet-switch-v1/image1.png "image_tooltip")

## PCB Design

To be frank, Fast Ethernet is quite lenient with design choices, but it is still good practice to follow application notes by various companies. Here are the key pointers:

* Differential pairs, RX+/RX- and TX+/TX-, should be impedance matched and short (100Ω differential controlled)
* No copper on any layer under discrete magnetics to minimize coupling

![](/blogs/murex-ethernet-switch-v1/pcb.png)

Additionally, if chosen as the voltage regulator, a cheap LDO should be cooled with thermal vias and/or a heatsink.

![](/blogs/murex-ethernet-switch-v1/ldo.png)

Here are some sources we referenced when designing the board:

* [Pulse Electronics App Note](https://www.pulseelectronics.com/wp-content/uploads/2020/12/Pulse_Layout-Considerations-v7.pdf)
* [TI App Note](https://www.ti.com/lit/pdf/snla387)
* [Altium Article](https://resources.altium.com/p/ethernet-layout-routing-standards-mac-phy-and-rj-45-connectors)

Next Revision/Flaws

As with all things, there are many flaws with this board. Although none fatal, these flaws limit the board to what it _could be_. Here are a few that we thought of while testing the board. (_hey, 20/20 hindsight, am I right?_)

* Make it smaller!!
  * The layout of the board and component choices limited how small we could make this board. Let’s see how small we can make the board next time!
* LDO Inefficiencies
  * The LDO dissipates a lot of heat, despite adequate thermal cooling. Next time, high frequency DC-DC converter or, if we’re lazy, heatsink.
* EEPROM implementation
  * Although an EEPROM is not necessary for the functionality of the IP175G, we decided to implement it for two reasons.

1. More configurations for future expandability with queues, CoS, VLAN and so much more.
2. Breaks out the serial pins for the IP175G, allowing it to be connected to a larger system for more fine-grade control.

![alt_text](/blogs/murex-ethernet-switch-v1/image2.png "image_tooltip")

* Serial control of IP175G
  * We don’t use it, but maybe someone else will…

## Conclusion

…or maybe someone else will improve upon this design, integrate it into a robot of some sort (we certainly will!), or learn from it. We don’t have high frequency oscilloscopes or VNAs, nor the know-how to run large-scale simulations and optimize. There are definitely even more flaws with our design that we never even knew about! Feel free to reference and improve upon our design, for that is the beauty of open source. We look forward to seeing what _you_ can learn and create with the MUREX Ethernet Switch. Wrapping up Thanksgiving break, we’ve [attempted the impossible](https://docs.murexrobotics.com/elec/onboarding/welcome#attempt-the-impossible), and somehow pulled it off (flaws and all).

### > Technology. For. All

![](/blogs/murex-ethernet-switch-v1/photo8.jpg)
![](/blogs/murex-ethernet-switch-v1/photo4.jpg)
