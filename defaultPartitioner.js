const murmurhash = require('murmurhash');

/**
 * Seed value. Same as the java side implementation
 * @type {number}
 */
const seed = 0x9747b28c;

let topicPreviousPartition = {};

/**
 * Core partitioning logic. Uses murmurhash
 * @param topicName
 * @param messageKey
 * @param totalNumberOfPartitions
 * @returns {*} partitionNumber
 */
function partition(topicName, messageKey, totalNumberOfPartitions) {
    if(topicName == null)
        return null;

    // Total number of partitions SHOULD be same as what it has been configured, else you'll get "Unknown partition" error.
    totalNumberOfPartitions = isNaN(totalNumberOfPartitions) ? Number(totalNumberOfPartitions) : totalNumberOfPartitions;

    // If total number of partition in null or equals 1, then set the partition number as 0.
    if(totalNumberOfPartitions <= 1)
        return 0;

    // If partitionKey is empty/null, then do a round robin on the topic considering it's total number of partitions.
    if(messageKey == null) {
        if(!topicPreviousPartition[topicName])
            topicPreviousPartition[topicName] = 0;
        else {
            if(topicPreviousPartition[topicName] >= totalNumberOfPartitions)
                topicPreviousPartition[topicName] = 0;
        }

        return topicPreviousPartition[topicName]++;
    }

    // All good, calculate the partition number.
    return toPositive(murmurhash.v2(messageKey, seed)) % totalNumberOfPartitions;
}

/**
 * Convert the given number to *a* positive value.
 * @param number
 * @returns {number}
 */
function toPositive(number) {
    return number & 0x7fffffff;
}

module.exports = {
    partition
};