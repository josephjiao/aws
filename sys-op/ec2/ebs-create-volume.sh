for i in {1..26}; do
    aws ec2 create-volume --size 1 --region cn-north-1 --availability-zone cn-north-1a --volume-type gp2 --profile default
    echo $i
done

