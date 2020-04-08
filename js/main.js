
window.addEventListener( 'DOMContentLoaded', () =>{

	let flashCardsAsideCards = document.getElementsByClassName('flash-cards__card-aside');
	let flashCardsMainCards = document.getElementsByClassName('flash-cards__card-main');

	for (let item of flashCardsAsideCards) {
		item.setAttribute('draggable', 'true');
		
	}

	setCardsId(flashCardsAsideCards, 'flash-cards__card-aside');
	setCardsId(flashCardsMainCards, 'flash-cards__card-main');




	//function adds id to cards
	function setCardsId( deckFlashCards, idName ) {
		let i = 1;
		for ( let item of deckFlashCards ) {
			item.setAttribute('id', `${idName}--${i}`);
			i++;
		}
	}




	function dragstart_handler (ev) {
		ev.dataTransfer.setData("text/plain", ev.target.id);
	}

	function dragover_handler(ev) {
		ev.stopPropagation();
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
	}
	function drop_handler(ev) {
		ev.preventDefault();
		// Get the id of the target and add the moved element to the target's DOM
		const draggableData = ev.dataTransfer.getData("text/plain");
		//console.log(ev.target);
		const dropZone = ev.target; // this;
		//console.log(dropZone);
		let dropZoneFlag =  dropZone.id.split('--')[1];
		let draggableDataFlag = draggableData.split('--')[1];
		//console.log(dropZoneFlag + ',' + draggableDataFlag);
		if ( dropZoneFlag === draggableDataFlag ) {
			dropZone.appendChild(document.getElementById(draggableData));
		}
	}//drop

	function enter_handler(ev) {
		console.log(event.target);
	}

	
	for ( let item of flashCardsAsideCards ) {
		item.addEventListener( "dragstart", dragstart_handler );
		item.addEventListener("dragover", dragover_handler);
	}

	for ( let item of flashCardsMainCards ) {
		item.addEventListener("dragover", dragover_handler);
		item.addEventListener("drop", drop_handler);
		
	}



} ); //DOMContentLoaded