# Digital Skills Tool

This is the code for a website to support classes to help refugees and other participants to improve their digital skills by training on prototyped forms of exisiting services.

This is a work in progress.

The course is developed by **East Renfrewshire Council** in collaboration with **Scottish Enterprise** who provides the tool to support it.

This is using the [**GOV.UK Prototype kit**](https://govuk-prototype-kit.herokuapp.com/docs)

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
<br><br>

![screenshot of a GOV.UK page - desktop view](/app/assets/images/document-the-tool/screen-desktop-govuk.png)

<br><hr>

### A GOV.UK page - mobile view
<br><br>

![screenshot of a GOV.UK page - mobileview](/app/assets/images/document-the-tool/screen-mobile-govuk.png)

<br><hr>

### A basic council form
<br><br>

![screenshot of a council page](/app/assets/images/document-the-tool/screen-council.png)

<br><hr>

### A basic Scottish Government page
<br><br>

![screenshotof a Scottish Government page](/app/assets/images/document-the-tool/screen-sg.png)

<br><hr>

### A basic Social Security page - desktop view
<br><br>

![screenshot of Social Security - desktop vie](/app/assets/images/document-the-tool/screen-desktop-sss.png)

<br><hr>

### A basic Social Security page - mobile view
<br><br>

![screenshot of applying for a provisional licence](/app/assets/images/document-the-tool/screen-DVLA-1.png)

<br><hr>

### The start page for: Apply for a provisional driving licence
<br><br>

![screenshot of applying for a provisional licence - start page](/app/assets/images/document-the-tool/screen-DVLA-2.png)
