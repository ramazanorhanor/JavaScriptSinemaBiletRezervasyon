const container = document.querySelector('.container');
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie")
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        //console.log(e);
        e.target.classList.toggle('selected');
        calculateTotal();
        // console.log(selectedSeatCount)
    }
});


select.addEventListener('change', function (e) {
    calculateTotal();
});
function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected");

    const selectedSeatsArr = [];
    const seatArr = [];
    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat)
        //   console.log(seat)
    })

    seats.forEach(function (seat) {
        seatArr.push(seat);
        // console.log(seat)
    });

    let selectedSeatIndex = selectedSeatsArr.map(function (seat) {
        return seatArr.indexOf(seat);
    });
    console.log(selectedSeatIndex);
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value
    saveToLocalStorage(selectedSeatIndex)
    //  console.log(seats);
    // console.log(selectedSeats);


}
function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected")
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}
function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}