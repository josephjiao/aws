instance_id=$(aws ec2 describe-instances --filter "Name=tag:Name,Values=Compute" --query 'Reservations[*].Instances[*].{ID:InstanceId}' --region=ap-northeast-1 --output=text)
echo $instance_id
aws ec2 terminate-instances --instance-ids  $instance_id --region ap-northeast-1
