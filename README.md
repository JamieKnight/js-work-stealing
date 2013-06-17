js-work-stealing
================

Nieve work-stealing implementation built ontop of javascript web workers. This code uses prime factorisation as an example problem. Effectively, it factors a list of 5000 15 digit numbers in parralel. The workstealing method increases performance by up to ~12%.

## Work Steealing
Work stealing is a method of distributing paralell computations across a number of resources. Essentually, work queued for one resource will be stolen by other resources should those resources become idle.

## Getting started:
To get started, check out the code and load index.html in your borwser. Index.html will attempt to factorise 5000 15 digit numbers which will occuupy your system for a while. On a i7 15" Retina MacBook Pro (Quad core) it takes around 43 seconds.

This demo wont run locally in chrome as it causes a DOM security exception. If you load Chrome or Chrome Canary from the command line passing the --allow-file-access-from-files, then demo will work. Eg: 

    /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --allow-file-access-from-files

## Method.
This is a very simple experiment. It starts with work devided equally between the 8 workers. When a worker completes its share of the work, it then looks to find other work, and steals that. This process is repeated each time a worker runs out of work to do untill there is no work left to do.

This Method is very nieve and simple. Its not true work stealing as the work is parted at the start. However, its simple enough to give a result. In basic testing, work stealing increased the performance by 8-11% on tests data sets of ~2500 & 5000.

The table below includes the raw tests stats:
 
| Workers  | Problem Size | Work Stealing | Time (seconds) | Delta % over not stealing | 
| ------------- | ------------- | ------------- | ------------- | ------------- | 
| 8 | 2547 | Not Stealing | 23.523 | -- |
| 8 | 2547 | Stealing | 21.74 | 8.24% |
| 8 | 5000 | Not Stealing | 48.245 | -- |
|  8 | 5000 | Stealing | 43.124 | 11.8% |

