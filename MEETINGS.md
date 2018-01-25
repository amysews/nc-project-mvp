# Day 1

## Morning standup:
Discussed priorities for today -
* Choose how we're going to orangise our work (i.e. Trello board etc)
* Set up Github repo(s)
* What is our MVP - what are we aiming for by end of the week
* What spikes do we still need doing?
* Who's doing what first?

## Team meeting - (AM)
**Objective:** Make plan for next few days - MVP

Discussed what our MVP is:
* User A can submit a question
* User B can view this question and submit an answer
* User A can then view this answer

**Assumptions:**

*sign-up* - undecided how much required for MVP - at least want to identify user A/B

For MVP v1 we're going to ignore audio files and just get it working for text files. (Then we can just drop in audio files into the process/system)

**Deliverables:**

* Front-end
  * Input form for questions
  * Input form for answers
  * Views of questions and answers

* AWS
  * Database
    * Questions
    * Answers
    * Users
  * Storage (S3 buckets)
    * question files
    * answer files
  * Lamdba functions to navigate between above?

* Server?

* Deploy? (Need to check how 'deployed' we need to be)

**KEY SPIKES**

Agreed on series of separate spikes needed before building MVP (mainly around AWS). Aiming to get spikes down by Wednesday at the latest to allow enough time to build an MVP by Friday.

* set up the AWS environment
  * log ins - single or add multiple users?
  * set up buckets and databases to then use in the spikes below
* INTO AWS
  * Web to database (metadata)
  * Web to S3 bucket (text file)
  * S3 bucket to database (text file)
  * (reconcile database records - make sure metadata and text file in same record)
* OUT OF AWS
  * Database to web (via server?)
  * S3 bucket to web (via server?) - *does this happen as two separate things or together in one request*
* FRONT-END
  * Input forms
  * Output views of Q&As
  
# Day 2

## Morning standup:
* Reviewed progress from yesterday
* Aiming to get all the actions going into AWS working by the end of the day

## Afternoon standup:
* CM + SM working on the lambda function to get info from the S3 bucket to the database
* AJMC + ALC done web to database, database to web - now looking at S3 bucket to web - then aiming to put it all together

# Day 3

## Achieved:
* Finished all the spiking of the elements
* Set up all AWS elements
* Started react app
* spiked audio

# Day 4

* More work on react app
* Still working on getting the audio data from the browser to s3 bucket
