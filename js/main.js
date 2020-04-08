
window.addEventListener( 'DOMContentLoaded', () =>{

	let flashCardsDraggable = document.getElementsByClassName('flash-cards__card--draggable');
	let flashCardsDropZone = document.getElementsByClassName('flash-cards__card--drop-zone');
	let elementDropZoneClassName = 'flash-cards__card--drop-zone';

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
	for ( let item of flashCardsDraggable ) {
		item.addEventListener( "dragstart", dragstart_handler );
		item.addEventListener("dragover", dragover_handler);
	}

	for ( let item of flashCardsDropZone ) {
		item.addEventListener("dragover", dragover_handler);
		item.addEventListener("dragenter", dragenter_handler);
		item.addEventListener("dragleave", dragleave_handler);
		item.addEventListener("dragend", dragend_handler);
		item.addEventListener("drop", drop_handler);
		
	}
	

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
		
	}

	/*
	************* END
	*/
	function dragend_handler(ev) {
		let dropZoneElement = this;
		removeClasses(dropZoneElement,enteredClassName, isMatchingClassName, isNotMatchingClassName);
	}

	/*
	************* DROP
	*/
	function drop_handler(ev) {
		let dropZoneElement =  this;
		if ( isMaching(dropZoneElement.id, DraggableElementIdCurrent) ) {
			dropZoneElement.appendChild(document.getElementById(DraggableElementIdCurrent));
			dropZoneElement.classList.add(isPairedClassName);
		}
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
				} else {
					element.classList.add(isNotMatchingClassName);
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