var canvas = document.getElementById("canvas"),
	gd = canvas.getContext('2d'),
	balls = [],
	ball = {
		x : 0,
		y : 0,
		r : 1,
		vx : 0,
		vy : 0
	},
	mouse = {
		x : undefined,
		y : undefined
	};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for( let i = 0 ; i < 400 ; i ++ ){
	ball.x = getRandom( ball.r, canvas.width - ball.r );
	ball.y = getRandom( ball.r, canvas.height - ball.r );
	ball.vx = getRandomVector( -3, 3 );
	ball.vy = getRandomVector( -3, 3 );
	balls.push({...ball});
}

window.onload = function(){
	setInterval(function(){
		draw();
		update();
	}, 10);
}

canvas.addEventListener('mousemove',function(e){
	mouse.x = e.pageX;
	mouse.y = e.pageY;
});

function draw(){
	gd.clearRect( 0, 0, canvas.width, canvas.height );
	gd.fillStyle = 'rgba( 255, 255, 255, 0.3 )';
	gd.textAlign = 'center';
	gd.textBaseline = 'middle';
	gd.fillText( "Author: Zheng-Luxi", canvas.width / 2, canvas.height / 2 );
	for( let item of balls ){
		gd.beginPath();
		gd.fillStyle = 'gray';
		gd.arc( item.x, item.y, item.r, 0, Math.PI * 2 );
		gd.fill();
		if( Math.sqrt( ( mouse.x - item.x ) * ( mouse.x - item.x ) + ( mouse.y - item.y ) * ( mouse.y - item.y ) ) <= 150 ){
			gd.beginPath();
			gd.moveTo( mouse.x, mouse.y );
			gd.lineTo( item.x, item.y );
			gd.strokeStyle = 'rgba( 100, 200, 100, 0.9 )';
			gd.lineWidth = 150 / Math.sqrt( ( mouse.x - item.x ) * ( mouse.x - item.x ) + ( mouse.y - item.y ) * ( mouse.y - item.y ) );
			gd.stroke();
		}
		for( let item1 of balls ){
			if( Math.sqrt( ( item1.x - item.x ) * ( item1.x - item.x ) + ( item1.y - item.y ) * ( item1.y - item.y ) ) <= 60 ){
				gd.beginPath();
				gd.moveTo( item1.x, item1.y );
				gd.lineTo( item.x, item.y );
				gd.strokeStyle = 'rgba( 125, 200, 100, 0.7 )';
				gd.lineWidth = 150 / Math.sqrt( ( mouse.x - item.x ) * ( mouse.x - item.x ) + ( mouse.y - item.y ) * ( mouse.y - item.y ) );
				gd.stroke();
			}
		}
	}
}

function update(){
	for( let item of balls ){
		item.x += item.vx;
		item.y += item.vy;
		if( item.x <= item.r || item.x >= canvas.width - item.r ){
			item.vx = -item.vx;
		}
		if( item.y <= item.r || item.y >= canvas.height - item.r ){
			item.vy = -item.vy;
		}
	}
}

function getRandom( min, max ){
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

function getRandomVector( min, max ){
	const num = getRandom( min, max ) * ( Math.random() / 2 - Math.random() );
	if( num == 0 ) return getRandomVector();
	return num;
}
