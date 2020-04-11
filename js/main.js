
window.addEventListener( 'DOMContentLoaded', () =>{

	let flashCardsDraggable = document.getElementsByClassName('flash-cards__card--draggable');
	let flashCardsDropZone = document.getElementsByClassName('flash-cards__card--drop-zone');
	let elementDropZoneClassName = 'flash-cards__card--drop-zone';

	let nameClassCardMain = 'flash-cards__card-main';
	let elementDropZoneId = 'flash-cards__card-drop-zone';
	let elementDraggableId = 'flash-cards__card-draggable';
	let isMatchingClassName = "is-matching";
	let isNotMatchingClassName = "is-not-matching";
	let isPairedClassName = "is-paired";
	let enteredClassName = "is-entered";

	for (let item of flashCardsDraggable) {
		item.setAttribute('draggable', 'true');
		
	}

	setCardsId(flashCardsDraggable, elementDraggableId);
	setCardsId(flashCardsDropZone, elementDropZoneId);

	let DraggableElementIdCurrent;
	let DraggableElementCurrent;

	for ( let item of flashCardsDraggable ) {
		item.addEventListener("drag", drag_handler);
		item.addEventListener( "dragstart", dragstart_handler );
		item.addEventListener("dragover", dragover_handler);

		// item.addEventListener('click', function() {
		// 	//if ( !DraggableElementCurrent.addEventListener("drag", drag_handler) ) {
		// 		console.log(this);
		// 		DraggableElementCurrent.classList.remove('in-move');
		// 	//}
		// });
		
	}

	for ( let item of flashCardsDropZone ) {
		item.addEventListener("dragover", dragover_handler);
		item.addEventListener("dragenter", dragenter_handler);
		item.addEventListener("dragleave", dragleave_handler);
		item.addEventListener("dragend", dragend_handler);
		item.addEventListener("drop", drop_handler);
		
	}


	

	let buttonsShowDesc = document.getElementsByClassName('flash-cards__button-show-desc');
	for ( let buttonShowDesc of buttonsShowDesc ) {
		buttonShowDesc.addEventListener('click', function(){
			console.log(buttonShowDesc);
			let cardMainIsPaired = buttonShowDesc.parentElement;
			cardMainIsPaired.classList.toggle('show-desc');
			cardMainIsPaired.getElementsByClassName('flash-cards__card-description')[0].classList.toggle('is-hidden');
		});
	}

	let buttonResetGame = document.getElementById('flash-cards__button-reset-game');
	buttonResetGame.addEventListener('click', function(){
		window.location.reload(false)
		return false;
	});

	/*
	* setting attribut id on draggable elements and dropZone's elements
	*/
	function setCardsId( deckFlashCards, idName ) {
		let i = 1;
		for ( let item of deckFlashCards ) {
			item.setAttribute('id', `${idName}--${i}`);
			i++;
		}
	}

	/*
	************* DRAG - handler drop and drag
	*/
	function drag_handler (ev) {
		ev.preventDefault();
		DraggableElementCurrent = ev.target;
		//DraggableElementCurrent.classList.add('in-move');
	}
	/*
	************* START - handler drop and drag
	*/
	function dragstart_handler(ev) {
		
		ev.dataTransfer.setData("text/plain", ev.target.id);
		DraggableElementIdCurrent = ev.dataTransfer.getData("text/plain");
		

	}

	/*
	************* OVER
	*/
	function dragover_handler(ev) {
		// prevent default to allow drop
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
		let dropZoneElement = this;
		
		setMatchingClass(dropZoneElement, elementDropZoneClassName);
		
	}
	/*
	*************ENTER
	*/
	function dragenter_handler(ev) {
		let dropZoneElement = this;
		setMatchingClass(dropZoneElement, elementDropZoneClassName);
		dropZoneElement.classList.add(enteredClassName);
	}

	/*
	************* LEAVE
	*/
	function dragleave_handler( ev ) {
		let dropZoneElement = this;
		removeClasses(dropZoneElement, enteredClassName, isMatchingClassName, isNotMatchingClassName);
		removeClasses(DraggableElementCurrent, isMatchingClassName, isNotMatchingClassName);
		
		
	}

	/*
	************* END
	*/
	function dragend_handler(ev) {
		ev.preventDefault();
		let dropZoneElement = this;
		removeClasses(dropZoneElement,enteredClassName, isMatchingClassName, isNotMatchingClassName);
		removeClasses(DraggableElementCurrent, isMatchingClassName, isNotMatchingClassName);
		
		
	}

	/*
	************* DROP
	*/
	function drop_handler(ev) {
		console.log(ev)
		ev.preventDefault();
		let dropZoneElement =  this;
		
		if ( isMaching(dropZoneElement.id, DraggableElementIdCurrent) ) {
			dropZoneElement.innerHTML = "";
			dropZoneElement.appendChild(document.getElementById(DraggableElementIdCurrent));
			
			DraggableElementCurrent.classList.remove('flash-cards__card--draggable', 'flash-cards__card-aside-title');
			DraggableElementCurrent.setAttribute('draggable', 'false');
			DraggableElementCurrent.removeAttribute('id');

			//dropZoneElement.classList.add(isPairedClassName);

			let cardMainElement = dropZoneElement.closest(`.${nameClassCardMain}`);
			cardMainElement.classList.add(isPairedClassName);

			dropZoneElement.classList.remove(elementDropZoneClassName);
			dropZoneElement.removeAttribute('id');
		}
		removeClasses(DraggableElementCurrent, isMatchingClassName, isNotMatchingClassName);
		removeClasses(dropZoneElement,enteredClassName, isMatchingClassName, isNotMatchingClassName);
	}

	/*
	************* get last number form given id=item-drop--2
	*/
	function getFlag (elementId) {
		if ( elementId ) {
			let index = elementId.lastIndexOf('--');
			return elementId.substring(index+2, elementId.length);
		} else {
			return '';
		}
	}
	

	/*
	************* checks if flags in elements ids are matching
	*/
	function isMaching ( dropZoneElementId, draggableElementId ) {
		let dropZoneElementFlag = getFlag(dropZoneElementId);
		let draggableElementFlag = getFlag(draggableElementId);
		if ( dropZoneElementFlag === draggableElementFlag  ) {
			return true;
		} else {
			return false;
		}
	}

	/*
	*sets classes (is-matching or is-not-matching) on element with requiredClassName
	*/
	function setMatchingClass (element, requiredClassName) {
		if ( element.classList.contains(requiredClassName) ) {
				if ( isMaching(element.id, DraggableElementIdCurrent) ) {
					element.classList.add(isMatchingClassName);
					DraggableElementCurrent.classList.add(isMatchingClassName);
				} else {
					element.classList.add(isNotMatchingClassName);
					DraggableElementCurrent.classList.add(isNotMatchingClassName);
				}
			}
	
	}//setMatchingClass


	/*
	***removes class names from element
	*/
	function removeClasses (element, ...arguments) {
		for ( let i = 0; i < arguments.length; i++ ) {
			element.classList.remove(arguments[i]);
		}
	}

} ); //DOMContentLoaded