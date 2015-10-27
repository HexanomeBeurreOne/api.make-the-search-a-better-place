# Make-the-search-a-better-place API Endpoints

### Display 'Hello World!'
**GET** _/sayHello_  

EXAMPLE:  
Request:  

    GET /sayHello

Response:  

    Hello World!


### Search links
**GET** _/search_

Request:

	GET /search?**q**=[query]&**num**=[number of links]

Response:

	JSON object containing result links


### Spotlight
**GET** _/spotlight_

EXAMPLE:
Request:  

    GET /spotlight?**text**=victor%20hugo%20test

Response:  

    URI list : http://dbpedia.org/resource/Test_cricket,http://dbpedia.org/resource/Victor_Hugo


### Sparql
**GET** _/sparql_

Request:  

    GET /sparql?**uri**=<[URI1]>,<[URI2]>

Response:  

    JSON Objects containing triplets : s (subject), p (predicate), o (object).
