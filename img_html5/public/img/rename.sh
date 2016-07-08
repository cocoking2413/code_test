#!/bin/bash
#rename.sh
#use rename .jpg
count=1
for jpg  in *.jpg
do
new=$count.jpg
mv "$jpg" "$new"  2> /dev/null
if [ $? -eq 0 ]
then 

    echo " Renameing $jpg  to $new "
        let count++
	fi 

	done
