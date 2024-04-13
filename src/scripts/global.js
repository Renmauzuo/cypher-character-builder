
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

    let descriptor = descriptors[character.descriptor];


    //TODO: Add points from leveling up
    let bonusPoints = 6;

    if (descriptor.bonusPoints) {
        bonusPoints += descriptor.bonusPoints;
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
        if (descriptor.pool) {
            let descriptorBonus = descriptor.pool[key];
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
    //We do this after the pool calculations so we can store current pool values
    localStorage.character = JSON.stringify(character);

    //TODO: Add skills from other sources
    $('#skills').empty();
    let skillList = [];
    
    //Pretty sure all descriptors have skills, but just in case
    if (descriptor.skills) {
        skillList = skillList.concat(descriptor.skills);
    }

    for (let i = 0; i < skillList.length; i++) {
        $('<p>'+skillList[i]+'</p>').appendTo('#skills');
    }

    let traitList = [];

    //They definitely don't all have traits.
    if (descriptor.traits) {
        traitList = traitList.concat(descriptor.traits);
    }

    if (traitList.length) {
        $('#traits').empty();
        for (let i = 0; i < traitList.length; i++) {
            $('<p><strong>'+traitList[i].name+':</strong> '+traitList[i].description+'</p>').appendTo('#traits');
        }
        $('#traits-wrapper').show();
    } else {
        $('#traits-wrapper').hide();
    }

    let inabilityList = [];
    if (descriptor.inabilities) {
        inabilityList = skillList.concat(descriptor.inabilities);
    }

    if (inabilityList.length) {
        $('#inabilities').empty();
        for (let i = 0; i < inabilityList.length; i++) {
            $('<p>'+inabilityList[i]+'</p>').appendTo('#inabilities');
        }
        $('#inabilities-wrapper').show();
    } else {
        $('#inabilities-wrapper').hide();
    }
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