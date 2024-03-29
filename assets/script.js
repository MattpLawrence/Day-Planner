const store = window.localStorage;

const container = $(".container");

const now = moment();

const currentTime = { text: moment().format("h:00 A"), hour: moment().hour() };

var nowDay = moment();
$('#nowDay').text(nowDay.format('dddd MMM Do, YY'));

var nowTime = moment();
$('#nowTime').text(nowTime.format('h:mm a'));

const range = (start, end, step) => {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    (x) => start + x * step
  );
};

const hoursOfTheDay = Array.from(new Array(24)).map((v, i) => {
  const text = moment().hour(i).format("h:00 A");
  const hour = moment().hour(i);
  return { text, hour };
});

function color(time) {
  return time.text === currentTime.text
    ? "present"
    : time.hour < now
    ? "past"
    : "future";
}

hoursOfTheDay.forEach((hr) => {
  const grid = $(
    `<form data-name="${hr.text}" class="grid grid-cols-12  border-gray-500 "></form>.`
  );

  const time = $(
    `<div class="flex items-center justify-center col-span-2 h-16">${hr.text}</div>`
  );

  const textArea = $(
    `<textarea name="${
      hr.text
    }" maxLength="50" style="resize: none; overflow: hidden;" class="col-span-8 h-16 p-6 ${color(
      hr
    )}">${store.getItem(hr.text) || ""}</textarea>`
  );

  textArea.keydown((e) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      return false;
    }
  });

  const saveButton = $(
    `<button type="submit" class="saveBtn col-span-2 h-16 text-white font-bold "><i class="fas fa-save text-xl"></i></button>`
  );

  grid.submit((e) => {
    e.preventDefault();

    const value = $(`textarea[name="${hr.text}"]`).val();

    store.setItem(hr.text, value);
  });

  grid.append(time);
  grid.append(textArea);
  grid.append(saveButton);

  container.append(grid);
});