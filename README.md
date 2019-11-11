# node-kafkaPartitioner
Kafka partition selection based on key and partitionCount

# Installation
Using npm:

```$ npm install --save node-kafka-partitioner```

# Example

```js
let kafkaDefaultPartitioner = require('node-kafka-partitioner');
kafkaDefaultPartitioner.partition(topicName, partitionKey, partitionCount);
```
