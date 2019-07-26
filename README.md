# csye7374-spring2019-project-notifier

Notifier web application will be the Kafka consumer. It consume messages from all partitions and forward the message to SNS. Tt does not track consumer offset. It track if message from Kafka topic has been successfully delivered to SNS topic.

## Ansible Roles and Playbooks (Infrastructure as code and Configuration Management)

``` buildimage.yml ``` - Build the Node js web application image.

``` hpa-playbook.yml ``` - Deploy horizontal pod scaler onto cluster.

``` pushimage.yml ``` - Push the image to xxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/csye7374 ecr repository.

``` rc-playbook.yml ``` - Deploy the Notifier web application container replicas and load balancer service on cluster.

``` rc-terminate-playbook.yml``` - Terminate the Notifier web application containers.
