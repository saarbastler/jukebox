#!/bin/bash
gpio -g write 23 0
mpg123 --frames 250 $1
gpio -g write 23 1

