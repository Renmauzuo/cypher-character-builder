
$(function () {

    populateSelect(descriptors, '#descriptor');
    populateSelect(types, '#type');

    $('input,select').on('change', buildCharacter);

    let savedCharacter = localStorage.character;
    if (savedCharacter) {
        deserializeJSON(savedCharacter);
    }

    buildCharacter();
});

function buildCharacter() {
    let character = {};
    
    $('select, input').each(function () {
        character[$(this).attr('id')] = $(this).val();
    });

    //TODO: Add points from leveling up
    let bonusPoints = 6;

    if (descriptors[character.descriptor].bonusPoints) {
        bonusPoints += descriptors[character.descriptor].bonusPoints;
    }
    
    let bonusSpent = 0;
    $('input[id$=-bonus]').each(function () {
        let value = parseInt($(this).val());
        let maxValue = parseInt($(this).attr('max'));
        //No malarky here
        if (value < 0) {
            $(this).val(0);
        } else if (value > maxValue) {
            $(this).val(maxValue);
            bonusSpent += maxValue;
        } else {
            bonusSpent += value;
        }
    });
    $('#remaining-bonus').html(bonusPoints-bonusSpent);

    //Calculate derived stats
    
    let pool = Object.assign({}, types[character.type].pool);

    //TODO: Handle for special luck pool from Lucky descriptor
    for (let key in pool) {
        let $bonusInput = $('#'+key+'-bonus');
        let bonusValue = parseInt($bonusInput.val());
        $bonusInput.attr('max', bonusPoints - bonusSpent + bonusValue);

        let attributeValue = pool[key] + bonusValue;
        if (descriptors[character.descriptor].pool) {
            let descriptorBonus = descriptors[character.descriptor].pool[key];
            if (descriptorBonus) {
                attributeValue += descriptorBonus;
            }
        }

        $('#'+key+'-pool').html(attributeValue);

        let $currentInput = $('#'+key+'-current');
        $currentInput.attr('max', attributeValue);
        let currentValue = parseInt($currentInput.val());

        if (isNaN(currentValue)) {
            //If no current value is set then default to max
            $currentInput.val(attributeValue);
        } else if (currentValue < 0) {
            $currentInput.val(0);
        } else if (currentValue > attributeValue) {
            $currentInput.val(attributeValue);
        }
    }

    //Save to local storage
    localStorage.character = JSON.stringify(character);
}
 
/**
 * Populates a select with entries from an object or array.
 * 
 * @param {object|array} dataSource The source object or array
 * @param {string} selector The query selector for the select to populate
 */
function populateSelect(dataSource, selector) {
    if (Array.isArray(dataSource)) {
        for (let i = 0; i < dataSource.length; i ++) {
            $('<option>'+dataSource[i]+'</option>').appendTo(selector);
        }
    } else {
        for (let key in dataSource) {
            $('<option value='+key+'>'+(dataSource[key].name || toSentenceCase(key))+'</option>').appendTo(selector);
        }
    }
}

/**
 * Returns a sentence case version of a string
 *
 * @param {string} targetString The string to convert to sentence case
 * @return {string} The sentence case string
 */
function toSentenceCase(targetString) {
    return targetString.replace(/(^\s*\w|[\.\!\?]\s*\w)/g,function(c){return c.toUpperCase()});
}

/**
 * Attempts to parse a JSON string into a character
 * 
 * @param {string} characterJSON The JSON string to convert into a character
 * 
 */
function deserializeJSON(characterJSON) {
    let deseralizedObject = JSON.parse(characterJSON);

    $('select, input').each(function () {
        let value = deseralizedObject[$(this).attr('id')];

        if (value) {
            $(this).val(value);
        }
    });
}