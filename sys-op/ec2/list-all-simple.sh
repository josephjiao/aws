aws ec2 describe-instances --query 'Reservations[*].Instances[*].{ID:InstanceId,Type:InstanceType,State:State.Name,privateIP:PrivateIpAddress, publicIP:PublicIpAddress,tag:Tags[?Key==`Name`]}' --output text


