export const script = `
document.addEventListener('message', function(event){
	if(event.data==='loaded'){
		window.postMessage(JSON.stringify({message:'from website'}));
	}
});
var position = ''
function toggleClass() {
	position= position === 'absolute'? 'static': 'absolute';
	var el = $($('ul', $('#footerphone')).children()[0]);
	el.css("position", position);
}

function onUrlClick(e){
	if (e.target.href && e.target.href.indexOf('.pdf')>-1){
		e.preventDefault();
	}
	window.postMessage(JSON.stringify({url: e.target.href}));
}
$(document).ready(function(){
	$('body').on('click', 'a', onUrlClick);
	$('.video-js .vjs-tech').css({position: 'absolute', top:0, left: 0, width: 210, height: 180});
})
`