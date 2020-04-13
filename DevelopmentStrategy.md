Group members should discuss and develop their  development strategy, 

# Roles

Altough we all worked together and all worked on everything, the main focus for all of us were:

**Ridwan Mukhtar** RM109

* Data and data models.

* Primary point of contact.

**Mark Schmieg** MS147

* Creation of the cluster graphs.

**Callum M Hayden** CMH1

* Creation of custom graphs.

# Development Stategy

For the development of this project we chose to follow an agile methodology, with weekly meetings discussing what we had done, any outstanding issues, and what we aimed to do for the following week. These weekly meetings were aided with small daily standups every other morning where we discussed our plans for the day and who was available to help out with errors throughout the day.

As we were far away and unable to meet regularly in person, paired with the fact we stayed in contact regularly through messages, we decided it would be beneficial if the project was hosted on a live server where we could see changes and bug test without the need to clone the repository onto the device we are on nor the need to run a local server for the data.

To do this, we hosted the project on https://www.f20dv.site and set up a continous deployment workflow.

## Continous Deployment

Continous deployment was set up through the use of buddy.works, laravel forge, gitlab and github. The use of github was to bypass the necesity of attempting to give buddy works and laravel forge access to any of our university gitlab accounts.

In order to make this work, when commits are pushed to gitlab, these commits are mirrored to a private github reposity (cmhayden/f20dv). This is done through the use of a gitlab mirroring pipeling. 

Once the commits are mirrored to the github repository, this triggers a Buddy.Works pipeline which sends a HTTP request to Laravel Forge (a server management tool). This request makes Forge pull the latest version of code from GitHub and load it on the server.