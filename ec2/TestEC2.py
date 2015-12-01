import boto3
import collections

ec2=boto3.resource('ec2')

SecurityGroupRule = collections.namedtuple("SecurityGroupRule", ["ip_protocol", "from_port", "to_port", "cidr_ip", "src_group_name"])

VPC_CIDR= '10.0.0.0/16'
RULES = [
    SecurityGroupRule("tcp", 22, 22, "0.0.0.0/0", None),
    SecurityGroupRule("tcp", 80, 80, "0.0.0.0/0", None),
]

def resetENV():
    #delete vpc
    for vpc in ec2.vpcs.all():
        if not vpc.is_default:
            print 'deleting vpc %s ' % (vpc.cidr_block)
            vpc.delete()
    # delete sg
    for group in ec2.security_groups.all():
        if group.group_name == 'default':
            pass
        else:
            print 'deleting security group %s ' % (group.group_name)
            group.delete()

#reset the env
resetENV()

#create vpc and subnet
vpc = ec2.create_vpc( CidrBlock=VPC_CIDR )
subnet1 = vpc.create_subnet( CidrBlock='10.0.0.0/24', )
subnet2 = vpc.create_subnet( CidrBlock='10.0.1.0/24', )
print 'subnet created %s %s'%(subnet1.subnet_id, subnet2.subnet_id)

#create security group
sg=ec2.create_security_group(
    GroupName='AutoGroup',
    Description='group created by script',
    VpcId=vpc.vpc_id,
)

def constructPermission(rule):
    return {
        'IpProtocol': rule.ip_protocol,
        'FromPort': rule.from_port,
        'ToPort': rule.to_port,
        'IpRanges': [
            {
                'CidrIp':rule.cidr_ip
            },
        ],
    }

ipPermissions=[constructPermission(rule) for rule in RULES]
print ipPermissions

response = sg.authorize_ingress(
    IpPermissions=ipPermissions
)
print 'sg created %s'%(sg.group_id)

instance1 = ec2.create_instances(ImageId='ami-f0fb1dc3',
                     MinCount=1,MaxCount=1,
                     KeyName='aws-global',
                     SubnetId=subnet1.subnet_id,
                     SecurityGroupIds=[sg.group_id],
                     InstanceType='t2.small')
print instance1

instance2= ec2.create_instances(ImageId='ami-f0fb1dc3',
                     MinCount=1,MaxCount=1,
                     KeyName='aws-global',
                     SubnetId=subnet2.subnet_id,
                     SecurityGroupIds=[sg.group_id],
                     InstanceType='t2.small')
print instance2
