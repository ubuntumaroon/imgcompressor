## About The Project

Batch compress image. Source images are either "jpeg" or "png", the compressed image in "jpeg" format. It compress all images in the input directory and the entire subtree.

### Built With

* [sharp](https://github.com/lovell/sharp)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* [Nodejs](https://nodejs.org/en/), install nodejs

### Installation

1. Download or clone the repo
   ```sh
   git clone https://github.com/ubuntumaroon/imgcompressor.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```



<!-- USAGE EXAMPLES -->
## Usage

Usage: node index.js [options] <dir>

Compress images in a directory recursively

Arguments:
  dir                        directory where images are saved

Options:
  -V, --version              output the version number
  -s, --sizes   <number...>  list of required image width, if not a number or 0, image will not be resized
                             (default: ["origin",500,1000])
  -q, --quality <number>     image quanlity 1-100 (default: 80)
  -h, --help                 display help for command

## Example:
- compress all images in current directory
  ```sh
  node index.js .
  ```

- resize image to width: 200, and quality: 60
  ```
  node index.js . -s 200 -q 60
  ``` 
