for i in `aws ec2 describe-volumes --filters Name=size,Values="1" --profile default --output text --query 'Volumes[*].{ID:VolumeId}'`; do
echo $i; aws ec2 delete-volume --volume-id $i --profile default
done
