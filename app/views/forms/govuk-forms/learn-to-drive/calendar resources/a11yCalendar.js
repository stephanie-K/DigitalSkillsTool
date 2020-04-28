var KEY = {SPACE: 32,ESCAPE: 27,PAGE_UP: 33,PAGE_DOWN: 34,END: 35,HOME: 36,LEFT:37,UP: 38,RIGHT: 39,DOWN: 40,ENTER: 13, TAB: 9};
function initializeA11yCalendar(prevTabIds, nextTabIds, inputId) {

    setTimeout(function () {
        var today = $$('.ui-datepicker-today a')[0];

        if (!today) {
            today = $$('.ui-state-active')[0] ||
                $$('.ui-state-default')[0];
        }

       /* Hide the entire page (except the date picker) from screen readers to prevent document navigation
        (by headings, etc.) while the popup is open*/
        $$("main").attr('id', 'dp-container');
        $$("#dp-container").attr('aria-hidden', 'true');
        $$("#skipnav").attr('aria-hidden', 'true');

        /*Hide the "today" button because it doesn't do what you think it supposed to do*/
        $$(".ui-datepicker-current").hide();

        /*Add aria-label to back button*/
        $$("#backButton").attr('aria-label', $$("#backButton").val() );
        $$("#cancel").attr('aria-label', $$("#cancel").val() );

        keyEventHandler(prevTabIds, nextTabIds, inputId);
    }, 0);

}

function keyEventHandler(prevTabIds, nextTabIds, inputId) {

    var activeDate;
    var container = getContainer();
    var get$Obj = function(ids) {
        var formatId = function (id) { return "#" + id.replace(":","\\:")};
        if (ids instanceof Array) {
            for (var i = 0; i < ids.length; i++) {
                var $object = $$(formatId(ids[i]));
                if ($object.length > 0 && $object.is(":focusable")) {
                    return $object;
                }
            }
            return "";
        } else {
            return $$(formatId(ids));
        }
    };
    var $nextFocus = function () {
        return get$Obj(nextTabIds);
    };
    var $prevFocus = function () {
        return get$Obj(prevTabIds);
    };

    if (inputId) {
        var input = get$Obj(inputId);
    }

    if (!container) {
        return;
    }

    container.setAttribute('role', 'application');
    container.setAttribute('aria-label', 'Calendar view date-picker');

    var prev = $$('.ui-datepicker-prev', container)[0],
        next = $$('.ui-datepicker-next', container)[0];


    /*This is the line that needs to be fixed for use on pages with base URL set in head*/
    next.href = 'javascript:void(0)';
    prev.href = 'javascript:void(0)';

    next.setAttribute('role', 'button');
    next.removeAttribute('title');
    prev.setAttribute('role', 'button');
    prev.removeAttribute('title');

    appendOffscreenMonthText(next);
    appendOffscreenMonthText(prev);

   /* delegation won't work here for whatever reason, so we are forced to attach individual click listeners to the prev
    next month buttons each time they are added to the DOM*/
    $$(next).on('click', updateHeaderElements);
    $$(prev).on('click', updateHeaderElements);

    monthDayYearText();

    $$("body").on("keydown", function(event) {
        var which = event.which;
        var $target = $$(event.target);
        var $next = $$('.ui-datepicker-next');
        var $prev = $$('.ui-datepicker-prev');
        var $firstDate = $$("a.ui-state-default").first();


        if ($target.is($prevFocus())
            && $prev.is(":visible")
            && which === KEY.TAB
            && !event.shiftKey
        ) {
            if (!$prev.hasClass("ui-state-disabled")) {
                event.preventDefault();
                $prev.attr("tabindex", "0");
                $prev.attr("role", "button");
                $prev.removeAttr("title");
                $prev.focus();
            } else if ($firstDate.is(":focusable")) {
                event.preventDefault();
                $firstDate.focus();
            } else if (!$next.hasClass("ui-state-disabled")) {
                event.preventDefault();
                $next.attr("tabindex", "0");
                $next.attr("role", "button");
                $next.removeAttr("title");
                $next.focus();
            } else {
                event.preventDefault();
                $nextFocus().focus();
            }
        } else if ($target.is($nextFocus())
            && $next.is(":visible")
            && which === KEY.TAB
            && event.shiftKey
        ) {
            if (!$next.hasClass("ui-state-disabled")) {
                event.preventDefault();
                $next.attr("tabindex", "0");
                $next.attr("role", "button");
                $next.removeAttr("title");
                $next.focus();
            } else if ($firstDate.is(":focusable")) {
                event.preventDefault();
                $firstDate.focus();
            } else if (!$prev.hasClass("ui-state-disabled")) {
                event.preventDefault();
                $prev.focus();
            } else {
                event.preventDefault();
                $prevFocus().focus();
            }
        }
    });

    $$(container).on('keydown', function calendarKeyboardListener(keyVent) {
        var which = keyVent.which;
        var target = keyVent.target;
        var dateCurrent = getCurrentDate();
        var $next = $$('.ui-datepicker-next');
        var $prev = $$('.ui-datepicker-prev');
        var $firstDate = $$('a.ui-state-default').first();
        var $lastDate = $$('a.ui-state-default').last();

        $next.blur(function () {
            $next.attr("title", "Next");
            $next.removeAttr("role");
            $next.removeAttr("tabindex");
        });

        $prev.blur(function () {
            $prev.attr("title", "Prev");
            $prev.removeAttr("role");
            $prev.removeAttr("tabindex");
        });

        if (!dateCurrent) {
            dateCurrent = $$('a.ui-state-default')[0];
            setHighlightState(dateCurrent);
        }
        if (KEY.ESCAPE === which) {
            keyVent.stopPropagation();
            var container = $('#ui-datepicker-div');
            $(container).off('keydown');
            // return closeCalendar();
        } else if (which === KEY.TAB && keyVent.shiftKey) {
            keyVent.preventDefault();

            if ($$(target).hasClass('ui-state-default')) {
                if ($prev.hasClass('ui-state-disabled')){
                    $prevFocus().focus();
                    if (input) {
                        input.datepicker("hide");
                    }
                } else {
                    $prev.attr("tabindex","0");
                    $prev.attr("role","button");
                    $prev.removeAttr("title");
                    $prev.focus();
                }
            } else if ($$(target).hasClass('ui-datepicker-next')) {
                $firstDate.focus();
            } else if ($$(target).hasClass('ui-datepicker-prev')) {
                $prevFocus().focus();
                if (input) {
                    input.datepicker("hide");
                }
            }
        } else if (which === KEY.TAB) {

            keyVent.preventDefault();
            activeDate = $$('.ui-state-highlight') ||
                $$('.ui-state-active')[0];
            if (activeDate) {
                activeDate.focus();
            }

            if ($$(target).hasClass('ui-state-default')) { //Inside the calendar widget (dates)
                if ($next.hasClass('ui-state-disabled')) {
                    $nextFocus().focus();
                    if (input) {
                        input.datepicker("hide");
                    }
                } else {
                    $next.attr("tabindex","0");
                    $next.attr("role","button");
                    $next.removeAttr("title");
                    $next.focus();
                }
            } else if ($$(target).hasClass('ui-datepicker-next')) { //on the the next arrow for the month navigation
                $nextFocus().focus();
                if (input) {
                    input.datepicker("hide");
                }
            } else if ($$(target).hasClass('ui-datepicker-prev')) { //on the previous arrow for the months navigation
                $firstDate.focus();
            }
        } else if (which === KEY.LEFT) {        // if we're on a date link...
            if (!$$(target).hasClass('ui-datepicker-close') && $$(target).hasClass('ui-state-default')) {
                keyVent.preventDefault();
                keyVent.stopImmediatePropagation();
                previousDay(target);
            }
        } else if (which === KEY.RIGHT) {          // if we're on a date link...
            if (!$$(target).hasClass('ui-datepicker-close') && $$(target).hasClass('ui-state-default')) {
                keyVent.preventDefault();
                keyVent.stopImmediatePropagation();
                nextDay(target);
            }
        } else if (which === KEY.UP) {
            if (!$$(target).hasClass('ui-datepicker-close') && $$(target).hasClass('ui-state-default')) {
                keyVent.preventDefault();
                keyVent.stopImmediatePropagation();
                keyUpHandler(target, container, $prev);
            }
        } else if (which === KEY.DOWN) {
            if (!$$(target).hasClass('ui-datepicker-close') && $$(target).hasClass('ui-state-default')) {
                keyVent.preventDefault();
                keyVent.stopImmediatePropagation();
                keyDownHandler(target, container, $next);
            }
        } else if (which === KEY.ENTER) {
            if ($$(target).hasClass('ui-state-default')) {
                setTimeout(100);
            } else if ($$(target).is($prev) || $$(target).is($next)) {
                event.preventDefault();
                target.click();
            }
        } else if (KEY.HOME === which) {
            keyVent.preventDefault();
            $firstDate.focus();
        } else if (KEY.END === which) {
            keyVent.preventDefault();
            $lastDate.focus();
        }
        $$(".ui-datepicker-current").hide();
    });
}

function handleNextMonthNavigation() {
    setTimeout(function () {
        updateHeaderElements();
        prepHighlightState();
        $$('.ui-datepicker-next').focus();
        $$(".ui-datepicker-current").hide();
    }, 0);
}

function handlePrevMonthNavigation() {
    setTimeout(function () {
        updateHeaderElements();
        prepHighlightState();
        $$('.ui-datepicker-prev').focus();
        $$(".ui-datepicker-current").hide();
    }, 0);
}

function previousDay(dateLink) {
    if (!dateLink) {
        return;
    }

    var links = $$('a.ui-state-default', getContainer()),
        index = $$.inArray(dateLink, links);

    if (index > 0) {
        $$(links.get(index - 1)).focus();
    } else {
        handlePrevious(dateLink);
    }
}

function handlePrevious(target) {
    var container = getContainer();
    if (!target) {
        return;
    }
    var currentRow = $$(target).closest('tr');
    if (!currentRow) {
        return;
    }
    var previousRow = $$(currentRow).prev();

    if (!previousRow || previousRow.length === 0 || $$('a.ui-state-default', getContainer()).first().is(target)) {
        previousMonth();        // there is not previous row, so we go to previous month...
    } else {
        var prevRowDates = $$('td a.ui-state-default', previousRow);
        var prevRowDate = prevRowDates[prevRowDates.length - 1];

        if (prevRowDate) {
            setTimeout(function () {
                setHighlightState(prevRowDate);
                prevRowDate.focus();
            }, 0);
        }
    }
}

function previousMonth() {
    var prevLink = $$('.ui-datepicker-prev')[0];
    var container = getContainer();
    prevLink.click();
    // focus last day of new month
    setTimeout(function () {
        var trs = $$('tr', container),
            lastRowTdLinks = $$('td a.ui-state-default', trs[trs.length - 1]),
            lastDate = lastRowTdLinks[lastRowTdLinks.length - 1];

        // updating the cached header elements
        updateHeaderElements();

        setHighlightState(lastDate);
        lastDate.focus();

    }, 0);
}

function prevMonthAtIndex(index) {
    var $prev = $$('.ui-datepicker-prev');
    $prev.click();

    var column = $$("td:nth-child(" + (index + 1) + ") a.ui-state-default:focusable");

    //calendar page has progress dialog and will exceed call stack so need to exclude that..
    if (column.length === 0 && getContainer().id !== "a11yCalendar") {
        prevMonthAtIndex(index)
    }

    column.last().focus();
}


///////////////// NEXT /////////////////
/**
 * Handles right arrow key navigation
 * @param  {HTMLElement} dateLink The target of the keyboard event
 */
function nextDay(dateLink) {
    if (!dateLink) {
        return;
    }

    var links = $$('a.ui-state-default', getContainer()),
        index = $$.inArray(dateLink, links);

    if (index < links.length - 1) {
        $$(links.get(index + 1)).focus();
    } else {
        handleNext(dateLink);
    }
}

function handleNext(target) {

    var container = getContainer();
    if (!target) {
        return;
    }
    var currentRow = $$(target).closest('tr'),
        nextRow = $$(currentRow).next();

    if (!nextRow || nextRow.length === 0 || $$('a.ui-state-default', getContainer()).last().is(target)) {
        nextMonth();
    } else {
        var nextRowFirstDate = $$('a.ui-state-default', nextRow)[0];
        if (nextRowFirstDate) {
            setHighlightState(nextRowFirstDate);
            nextRowFirstDate.focus();
        }
    }
}

function nextMonth() {
    nextMon = $$('.ui-datepicker-next')[0];
    var container = getContainer();
    nextMon.click();
    setTimeout(function () {       // focus the first day of the new month
        updateHeaderElements();   //updating the cached header elements

        var firstDate = $$('a.ui-state-default', container)[0];

        setHighlightState(firstDate);
        firstDate.focus();
    }, 0);
}

function nextMonthAtIndex(index) {
    var $next = $$('.ui-datepicker-next');
    $next.click();
    var column = $$("td:nth-child(" + (index + 1) + ") a.ui-state-default:focusable");

    //calendar page has progress dialog and will exceed call stack so need to exclude that..
    if (column.length === 0 && getContainer().id !== "a11yCalendar") {
        nextMonthAtIndex(index)
    }

    column.first().focus();
}

/////////// UP ///////////
/**
 * Handle the up arrow navigation through dates
 * @param  {HTMLElement} target   The target of the keyboard event (day)
 * @param  {HTMLElement} cont     The calendar container
 * @param  {HTMLElement} prevLink Link to navigate to previous month
 */
function keyUpHandler(target, cont) {
    var prevLink = $$('.ui-datepicker-prev')[0];
    var rowContext = $$(target).closest('tr');
    if (!rowContext) {
        return;
    }
    var rowTds = $$('td', rowContext),
        targetIndex = $$.inArray(target.parentNode, rowTds),
        prevRow = $$(rowContext).prev(),
        prevRowTds = $$('td', prevRow),
        parallel = prevRowTds[targetIndex],
        linkCheck = $$('a.ui-state-default', parallel)[0];

    if (prevRow && parallel) {

        /*There is a previous row, a td at the same index of the target AND there is a link in that td*/
        if (linkCheck) {
            setHighlightState(linkCheck);
            linkCheck.focus();
            return;
        }

        while (prevRow && parallel) {
            rowContext = rowContext.prev();
            rowTds = $$('td', rowContext);
            prevRow = $$(rowContext).prev();
            prevRowTds = $$('td', prevRow);
            parallel = prevRowTds.get(targetIndex);
            if(!parallel) break;
            linkCheck = $$('a.ui-state-default', parallel)[0];

            if (linkCheck) {
                setHighlightState(linkCheck);
                linkCheck.focus();
                return;
            }
        }
    }

    prevMonthAtIndex(targetIndex);
}

//////////////// DOWN ////////////////
/**
 * Handles down arrow navigation through dates in calendar
 * @param  {HTMLElement} target   The target of the keyboard event (day)
 * @param  {HTMLElement} cont     The calendar container
 * @param  {HTMLElement} nextLink Link to navigate to next month
 */
function keyDownHandler(target, cont) {
    var nextLink = $$('.ui-datepicker-next');
    var targetRow = $$(target).closest('tr');
    if (!targetRow) {
        return;
    }
    var targetCells = $$('td', targetRow),
        cellIndex = $$.inArray(target.parentNode, targetCells), // the td (parent of target) index
        nextRow = $$(targetRow).next(),
        nextRowCells = $$('td', nextRow),
        nextWeekTd = nextRowCells.get(cellIndex),
        nextWeekCheck = $$('a.ui-state-default', nextWeekTd)[0];

    if (nextRow.length > 0 && nextWeekTd) {

        /*There is a next row, a TD at the same index of `target`,  and theres an anchor within that td*/
        if (nextWeekCheck) {
            setHighlightState(nextWeekCheck);
            nextWeekCheck.focus();
            return;
        }

        while (nextRow.length > 0 && nextWeekTd) {
            targetRow = targetRow.next();
            targetCells = $$('td', targetRow);
            nextRow = $$(targetRow).next();
            nextRowCells = $$('td', nextRow);
            nextWeekTd = nextRowCells.get(cellIndex);
            if (!nextWeekTd) break;
            nextWeekCheck = $$('a.ui-state-default', nextWeekTd)[0];

            if (nextWeekCheck) {
                setHighlightState(nextWeekCheck);
                nextWeekCheck.focus();
                return;
            }
        }
    }

    nextMonthAtIndex(cellIndex);
}


/*add an aria-label to the date link indicating the currently focused date*/
function monthDayYearText() {
    var cleanUps = $$('.amaze-date');

    $$(cleanUps).each(function (clean) {
        clean.parentNode.removeChild(clean);
    });

    var datePickDiv = getContainer();
    if (!datePickDiv) {
        return;
    }

    var dates = $$('a.ui-state-default', datePickDiv);
    $$(dates).attr('role', 'button').on('keydown', function (e) {
        if (e.which === KEY.SPACE) {
            e.preventDefault();
            e.target.click();
            setTimeout(100);
        }
    });
    $$(dates).each(function (index, date) {
        var currentRow = $$(date).closest('tr'),
            currentTds = $$('td', currentRow),
            currentIndex = $$.inArray(date.parentNode, currentTds),
            headThs = $$('thead tr th', datePickDiv),
            dayIndex = headThs[currentIndex],
            daySpan = $$('span', dayIndex)[0],
            monthName = $$('.ui-datepicker-month', datePickDiv)[0].innerHTML,
            year = $$('.ui-datepicker-year', datePickDiv)[0].innerHTML,
            number = date.innerHTML;

        if (!daySpan || !monthName || !number || !year) {
            return;
        }

        // AT Reads: {month} {date} {year} {day} "December 18 2014 Thursday"
        var dateText = monthName + ' ' + date.innerHTML + ' ' + year + ' ' + daySpan.title;

        // Add an aria-label to the date link reading out the currently focused date
        date.setAttribute('aria-label', dateText);
    });
}



/*Update the cached header elements because we're in a new month or year*/
function updateHeaderElements() {
    var context = getContainer();
    if (!context) {
        return;
    }

    prev = $$('.ui-datepicker-prev', context)[0];
    next = $$('.ui-datepicker-next', context)[0];

    next.href = 'javascript:void(0)';       //make them click/focus - able
    prev.href = 'javascript:void(0)';

    next.setAttribute('role', 'button');
    prev.setAttribute('role', 'button');
    appendOffscreenMonthText(next);
    appendOffscreenMonthText(prev);

    monthDayYearText();             // add month day year text
}


function prepHighlightState() {
    var highlight;
    var cage = getContainer();
    highlight = $$('.ui-state-highlight', cage)[0] ||
        $$('.ui-state-default', cage)[0];
    if (highlight && cage) {
        setHighlightState(highlight);
    }
}

/*Set the highlighted class to date elements, when focus is received*/
function setHighlightState(newHighlight) {
    var prevHighlight = getCurrentDate();

    /*Remove the highlight state from previously highlighted date and add it to our newly active date*/
    $$(prevHighlight).removeClass('ui-state-highlight');
    $$(newHighlight).addClass('ui-state-highlight');
}


/*Grabs the current date based on the hightlight class*/
function getCurrentDate() {
    var currentDate = $$('.ui-state-highlight')[0];
    return currentDate;
}

function getContainer() {
    var container = document.getElementById("a11yCalendar");
    return container ? container : document.getElementById("ui-datepicker-div");
}

/**
 * Appends logical next/prev month text to the buttons
 * - ex: Next Month, January 2015
 *       Previous Month, November 2014
 */
function appendOffscreenMonthText(button) {
    var buttonText;
    var isNext = $$(button).hasClass('ui-datepicker-next');
    var months = [
        'january', 'february',
        'march', 'april',
        'may', 'june', 'july',
        'august', 'september',
        'october',
        'november', 'december'
    ];

    var currentMonth = $$('.ui-datepicker-title .ui-datepicker-month').text().toLowerCase();
    var monthIndex = $$.inArray(currentMonth.toLowerCase(), months);
    var currentYear = $$('.ui-datepicker-title .ui-datepicker-year').text().toLowerCase();
    var adjacentIndex = (isNext) ? monthIndex + 1 : monthIndex - 1;

    if (isNext && currentMonth === 'december') {
        currentYear = parseInt(currentYear, 10) + 1;
        adjacentIndex = 0;
    } else if (!isNext && currentMonth === 'january') {
        currentYear = parseInt(currentYear, 10) - 1;
        adjacentIndex = months.length - 1;
    }

    buttonText = (isNext)
        ? 'Next Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear
        : 'Previous Month, ' + firstToCap(months[adjacentIndex]) + ' ' + currentYear;

    $$(button).find('.ui-icon').html(buttonText);

}

/*Returns the string with the first letter capitalized*/
function firstToCap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
