# Digital Skills Tool

This work will create prototyped forms to support courses to **improve refugees’ IT skills and enhance their independency**. It could be a crucial tool to [tackle digital isolation](https://www.bbc.co.uk/news/uk-england-cornwall-50812576). The classes will also have other members of the community. Having learners from different backgrounds will help integrating refugees within the local community.


This course will be developed by **East Renfrewshire Council** in collaboration with **Scottish Enterprise** who will provide the tool. We also worked in partnership with ESOL & Adult Learning services, local Job centre and Bank of Scotland to organise the course. 

This is using the [**GOV.UK Prototype kit**](https://govuk-prototype-kit.herokuapp.com/docs)

_**Digital isolation: The vulnerable people left behind**_
_"Digital isolation is when people find themselves in a position where they can't access the internet or digital media and devices as much as other people", explains Bibi Reisdorf, an assistant professor in communication studies at the University of North Carolina at Charlotte. "In theory, everyone can access the internet, maybe at a library, community centre or at a friend's house, but there are different levels of access." Digital isolation is "surprisingly prevalent", according to Dr Reisdorf, with western countries seeing a rise in "mobile dependence". That doesn't mean people who are addicted to their mobile phones, it's when your mobile is your only access to the internet_

![East Renfrewshire Council Logo](/app/assets/images/ERC/erclogo.png)  ![Scottish Enterprise Logo](/app/assets/images/logoSE.png) 

## How we are using the tool

Different forms are needed to support the classes. Some are Council forms, some are GOVUK form and others are Scottish Government forms.

Different layouts have to be created for each and even among each category, there is a variety of layouts:

For example, the DVLA have a different layout and style compared to HMRC, or the Social Security Scotland have it's own style.

## Important files and paths

### Layout files in app>views>

- **layout.html** - default GOV.UK layout
- **layout_erc.html** - customised for Council forms
- **layout_sg.html** - customised for Scottish Government
- **layout_sss.html** - customised for Social Security Scotland
- **layout_tool.html** - look like the council one but for high level pages of the tool

### CSS/SASS files in app>assets>sass>
- **application.scss** - default GOV.UK css plus some we added for GOVUK forms
- **erc.scss** - styles to support the council forms
- **sg.scss** - style to support the Social Security Scotland and Scottish Government forms
- **other.scss** - style for other forms

### Each form has a folder app>views>forms>

### Route.js app>

This file is key to introduce logic and validation to the forms. It is shared by all the forms.

## Examples of template page

### A GOV.UK page - desktop view
![screenshot of a GOV.UK page - desktop view](/app/assets/images/document-the-tool/screen-desktop-govuk.png)

### A GOV.UK page - mobile view
![screenshot of a GOV.UK page - mobileview](/app/assets/images/document-the-tool/screen-mobile-govuk.png)

### A basic council form
![screenshot of a council page](/app/assets/images/document-the-tool/screen-council.png)

### A basic Scottish Government page
![screenshotof a Scottish Government page](/app/assets/images/document-the-tool/screen-sg.png)

### A basic Social Security page - desktop view
![screenshot of Social Security - desktop vie](/app/assets/images/document-the-tool/screen-desktop-sss.png)

### A basic Social Security page - mobile view
![screenshot of Social Security - mobile view](/app/assets/images/document-the-tool/screen-mobile-sss.png)
