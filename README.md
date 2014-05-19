droppel
=======

Droppel is a command line tool which persists files anywhere you want on your 
drive using Google Drive or Dropbox. Droppel allows you to have the same file
on two or more different machines (or different places on one machine) without
the need to have the file reside inside of the Drive or Dropbox folders.

## Installation

`npm install -g droppel`

## Use

To begin persisting a file, simply do `droppel FILE_NAME`

To persist a file that has been persisted from another machine, use the same command.

For example, on machine 1, you want to persist *myfile.txt*: `droppel myfile.txt`

Then, go to machine 2, and in whatever directory you want: `droppel myfile.txt`

You have now persisted the same file across two machines and different locations!

## Config

You may need to configure droppel to know where your machine's Dropbox or Drive
folders are, or to change which service is used. By default, Drive is used.

`droppel --config --drive /usr/someone/Google Drive` will set the drive location
to /usr/someone/Google drive

`droppel --config --service dropbox` will set the service to dropbox

`droppel --config --directory my-files` will place all persisted files inside
the folder "my-files" within your preferred service.

## Unlinking

To unlink files, `droppel --unlink myfile.txt`. **This will delete your file!**