import React, {useState} from 'react';

function Product({item, onItemClick}) {
    return (
        <div
            style={{
                border: "1px solid black",
                marginBottom: "5px",
                padding: "0 5px 0 5px",
                backgroundColor: item.isBookmarked ? "yellow" : "white",
            }}
        >
            <h1>{item.brand} {item.type}</h1>
            <p>{item.type} of {item.brand}</p>
            <button onClick={() => onItemClick(item.id)}>
                {item.isBookmarked ? "Remove bookmark" : "Set bookmark"}
            </button>
        </div>
    );
}

function ProductList({items, onItemClick, search}) {
    const filteredItems = items.filter((item) =>
        (item.brand + item.type).toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {filteredItems.map((item) => (
                <Product key={item.id} item={item} onItemClick={onItemClick}/>
            ))}
        </div>
    );
}

export default function App() {
    const [items, setItems] = useState([
        {id: 1, brand: 'Dell', type: "Laptops", isBookmarked: false},
        {id: 2, brand: 'Dell', type: "PCs", isBookmarked: false},
        {id: 3, brand: 'Hp', type: "Laptops", isBookmarked: false},
    ]);
    const [search, setSearch] = useState('');

    const handleItemClick = (itemId) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? {...item, isBookmarked: !item.isBookmarked} : item
            )
        );
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{marginBottom: "5px"}}
            />
            <ProductList items={items} onItemClick={handleItemClick} search={search}/>
        </div>
    );
}
