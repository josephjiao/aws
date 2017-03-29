#!/bin/bash
instance_id=$(aws ec2 run-instances --user-data file://UserData-efs.txt --cli-input-json file://arguments.json --query 'Instances[*].InstanceId' --output text)
aws ec2 create-tags --resources $instance_id  --tags 'Key=Name,Value=efs-test-c42xlarge' 'Key=stopinator,Value=terminate'
