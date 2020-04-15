let flashCards = {};
(function(){
	
	//------------show hide descriptions------------
	this.showHideDescription = function () {
		
		let buttonsShowDesc = document.getElementsByClassName('flash-cards__button-show-desc');
		for ( let buttonShowDesc of buttonsShowDesc ) {
			buttonShowDesc.addEventListener('click', function(){
				console.log('wow');
				let cardMainIsPaired = buttonShowDesc.parentElement;
				let cardMainDesc = cardMainIsPaired.querySelector('.flash-cards__card-description');
				
				if ( !cardMainDesc.classList.contains('is-hidden') && !cardMainDesc.classList.contains('is-visible') ) {
					cardMainDesc.classList.add('is-visible');
					console.log('if');
				} else {
					cardMainDesc.classList.toggle('is-visible');
					cardMainDesc.classList.toggle('is-hidden');
					console.log('else');
				}

			});
		}
	}//showHideDescription


	this.resetGame = function () {
		//--------------reset-game---------------------
		let buttonResetGame = document.getElementById('flash-cards__button-reset-game');
		buttonResetGame.addEventListener('click', function(){
			window.location.reload(false)
			return false;
		});
	}

	//----------------------------------------------
	//---------------------DRAG AND DROP CARDS------

	this.dragAndDrop = function () {

		let flashCardsDraggable = document.getElementsByClassName('flash-cards__card--draggable');
		let flashCardsDropZone = document.getElementsByClassName('flash-cards__card--drop-zone');
		let flashCardAside = document.getElementsByClassName('flash-cards__card-aside');

		const elementDropZoneClassName = 'flash-cards__card--drop-zone';
		const elementDraggableClassName = 'flash-cards__card--draggable';
		const cardMainClassName = 'flash-cards__card-main';
		const elementAsideTitleClassName = 'flash-cards__card-aside-title';
		const elementDropZoneId = 'flash-cards__card-drop-zone';
		const elementDraggableId = 'flash-cards__card-draggable';
		const isMatchingClassName = "is-matching";
		const isNotMatchingClassName = "is-not-matching";
		const isPairedClassName = "is-paired";
		const enteredClassName = "is-entered";

		for (let item of flashCardsDraggable) {
			item.setAttribute('draggable', 'true');
		}

		setCardsId(flashCardsDraggable, elementDraggableId);
		setCardsId(flashCardsDropZone, elementDropZoneId);

		let index = 1;
		let numberFlashCardsAside = flashCardAside.length;
		let orderFlashCArsAside = [];
		for ( let i = 0; i < numberFlashCardsAside; i++) {
			orderFlashCArsAside.push(i+1);
		}
		console.log(orderFlashCArsAside);
		
		
			//item.setAttribute('order', i);
			
		

		let DraggableElementIdCurrent;
		let DraggableElementCurrent;

		for ( let item of flashCardsDraggable ) {
			item.addEventListener("drag", drag_handler);
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
	
		//------DRAG AND DROP functions-----------------
		/*
		* setting attribute id on draggable elements and dropZone's elements
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
			dropZoneElement.classList.remove(enteredClassName, isMatchingClassName, isNotMatchingClassName);
			DraggableElementCurrent.classList.remove(isMatchingClassName, isNotMatchingClassName);
		}

		/*
		************* END
		*/
		function dragend_handler(ev) {
			ev.preventDefault();
			let dropZoneElement = this;
			dropZoneElement.classList.remove(enteredClassName, isMatchingClassName, isNotMatchingClassName);
			DraggableElementCurrent.classList.remove(isMatchingClassName, isNotMatchingClassName);
		}

		/*
		************* DROP
		*/
		function drop_handler(ev) {
			ev.preventDefault();
			let dropZoneElement =  this;
			
			if ( isMatching(dropZoneElement.id, DraggableElementIdCurrent) ) {
				dropZoneElement.innerHTML = "";
				dropZoneElement.appendChild(document.getElementById(DraggableElementIdCurrent));
				
				DraggableElementCurrent.classList.remove(elementDraggableClassName, elementAsideTitleClassName);
				DraggableElementCurrent.setAttribute('draggable', 'false');
				DraggableElementCurrent.removeAttribute('id');


				let cardMainElement = dropZoneElement.closest(`.${cardMainClassName}`);
				cardMainElement.classList.add(isPairedClassName);

				dropZoneElement.classList.remove(elementDropZoneClassName);
				dropZoneElement.removeAttribute('id');
			}
			dropZoneElement.classList.remove(enteredClassName, isMatchingClassName, isNotMatchingClassName);
			DraggableElementCurrent.classList.remove(isMatchingClassName, isNotMatchingClassName);
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
		function isMatching ( dropZoneElementId, draggableElementId ) {
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
					if ( isMatching(element.id, DraggableElementIdCurrent) ) {
						element.classList.add(isMatchingClassName);
						DraggableElementCurrent.classList.add(isMatchingClassName);
					} else {
						element.classList.add(isNotMatchingClassName);
						DraggableElementCurrent.classList.add(isNotMatchingClassName);
					}
				}
		}//setMatchingClass
	} //dragAndDrop


}).apply(flashCards);
	


window.addEventListener( 'DOMContentLoaded', () =>{
	
	flashCards.showHideDescription();
	flashCards.resetGame();
	flashCards.dragAndDrop();

} ); //DOMContentLoaded