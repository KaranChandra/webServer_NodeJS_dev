const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000; 

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs');
app.use(express.static(  __dirname + '/public'));

hbs.registerHelper('getCurrentYear' , () =>{
	return new Date().getFullYear();
});


//Middleware execution is depends on Order i.e order of app.use() statements
app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(`${now} : ${req.method} ${req.url}`);
	next();
})

app.get('/',(req,res) => {
	res.render('home' , {
		pageTitle : 'Home Page',
		currentYear : new Date().getFullYear(),
		welcomeMessage : 'Welcome to my Website'
	})
});

app.get('/about' , (req, res) => {
	res.render('about',{
		pageTitle : 'About Page',
		currentYear : new Date().getFullYear()
	});
});

app.get('/projects' , (req, res) =>{
	res.render('projects',{
		pageTitle : 'Project Page'
	});
});



app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});