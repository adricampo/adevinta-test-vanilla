# Adevinta front-end-test 

## Deploy link: [adevinta-test](https://adricampo.github.io/adevinta-test-vanilla/)

## Project Main Goals 

- Create a search var where introduce a text to look for movies/series.
- The movies/series should come from an external API (https://www.omdbapi.com/)
- Results should be listed in a grid and each result should be an item with a photo, title, description, year and rating. 
- Items should be links with the property id concatenated to the url (url + ${imdbID})
- The showed results could be sort by at least one field. 

## Functional Description

On this application users will be able to search series & movies and see them listed with many information about them.

They will be able to see more information and media if they press in any of the results because they will be redirected to another webpage.

Using the select var available, users could also sort the results obtained by the published year and the rating of the movies/series (always from higher number to lower).

Users will also see different feedback messages if the information what are they looking for is not available or if they forgot to write something in the search var.

## Use cases

User can do two actions: search and sortby.

<img src="images/Use-cases.png" height= "70" width="250">


## Screenshoots

#### Initial Screen

User can search movies/series from the API (https://www.omdbapi.com/).

<img src="images/Initial-screen.png" height= "250" width="130">

#### Results Screen

If the searched information does exist, user will see the results on the screen.

<div>
<img src="images/Results-screen1.png" height= "250" width="130">

<img src="images/Results-screen2.png" height= "250" width="130">
</div>


#### Sortby Screen

When there are some results, user can sort by published year or rating.

<img src="images/Sortby-screen.png" height= "250" width="130">

#### Input empty Screen

When user does not write anything on the search var and submit, the following feedback error will appear during 3 seconds.

<img src="images/Input-empty-screen.png" height= "250" width="130">

####  Information not found Screen

When the information searched by the user does not find any result on the API, the following feedback error will appear during 3 seconds.

<img src="images/Info-not-found-screen.png" height= "250" width="130">

#### Desktop view Screen

This is the view on the desktop mode. 

<img src="images/Desktop-view-screen.png" height= "250" width="430">
