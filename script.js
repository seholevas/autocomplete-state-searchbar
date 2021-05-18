const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas',
  'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];



const input = document.getElementById('states');
const suggestions = document.getElementsByTagName("ul")[0];

// input: string
// returns: array of strings 
// description: this function takes a string compares it to each string in the states constant variable.
//              if a state in states contains the string parameter passed in, then it is added to a new array.
//              that new array will be returned
function search_results(string)
{
  let matching = states.filter(state => state.toUpperCase().includes(string.toUpperCase()));
  return matching;
}

// input: input - string
//        results - array of strings
// returns: void
// description: this function is used to do html manipulation to display the results of any given input that the
//              user inserts. Displays the states that match the input given, and highlights the section of the word 
//              that matches the user's input.
function display_search_results(input, results)
{
  // clears unordered list of any list items or text
  suggestions.innerHTML = '';
  if(results.length >= 1 && input.length >= 1)
  {
    for (i = 0; i < results.length; i++)
    {
      // declaring variables
      let text = results[i];
      let start = text.toUpperCase().indexOf(input.toUpperCase());
      let end = start + (input.length - 1);
      let start_text = text.substring(0,start)
      let bolded_text = text.substring(start,end+1)
      let end_text = text.substring(end+1)

      //creates an li for the result that bolds the user's input within the current index of result
      suggestions.innerHTML += `<li>${start_text}<b>${bolded_text}</b>${end_text}</li>`;
    }
      // adds html class to text
      suggestions.classList.add('has-suggestions');
  }
//   if the input or their are no states that match the input
  else
  {
    //   remove the class and clear the html within the <ul>
      suggestions.classList.remove('has-suggestions');
      suggestions.innerHTML = "";
  }
}

// input event handler
function input_handler(event)
{
  let input = event.target.value;
  let matches = [];
  
  if(input.length >= 1)
  {
    matches = search_results(input);
  }
    display_search_results(input, matches);
  // console.log("input: "+ input,"matches: "+ matches);
}

// suggestion handler
function suggestion_handler(event)
{
  // gets the text of the current item triggering event
  input.value = event.target.innerText;
  // removes <li>'s from <ul>
  suggestions.innerHTML = "";
  //removes the css class from the <ul> after an <li> is clicked
  suggestions.classList.remove('has-suggetions');
}



input.addEventListener('keyup',input_handler)
suggestions.addEventListener('click', suggestion_handler)