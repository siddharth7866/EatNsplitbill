import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
export default function App() {
  const [showAddfrnd, setshowAddfrnd] = useState(false);
  const [showbill, setshowbill] = useState(null);

  function HandleShowfrnd() {
    setshowAddfrnd((friend) => !friend);
  }

  function handleshowbill(friend) {
    setshowbill(friend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FireindsList handlefunc={handleshowbill} />
        {showAddfrnd && <FormAddfriend />}
        <Button onClick={HandleShowfrnd}>
          {showAddfrnd ? "Close" : "Add Friend"}
        </Button>
      </div>
      {showbill && <FormSplitBill selectedfrnd={showbill} />}
    </div>
  );
}

function FireindsList({ handlefunc }) {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} handlefunc={handlefunc} />
      ))}
    </ul>
  );
}

function Friend({ friend, handlefunc }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          {" "}
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => handlefunc(friend)}>Select</Button>
    </li>
  );
}

function FormAddfriend() {
  return (
    <form className="form-add-friend">
      <label> 👨Friend Name</label>
      <input type="text" />
      <label>👲 Image Url</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedfrnd }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedfrnd.name}</h2>
      <label> 💰 Bill Value</label>
      <input type="text" />
      <label>🧘 Your Expense</label>
      <input type="text" />
      <label>💰 {selectedfrnd.name} expense</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="You">You</option>
        <option value="Friend">{selectedfrnd.name}</option>
      </select>
    </form>
  );
}
