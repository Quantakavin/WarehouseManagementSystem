function ProductCard() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">T-Loan Overview</span>
        <div>
          <div>
            <span className="Current">Current</span>
            <h1 className="Current"></h1>
          </div>
          <div>
            <span className="Drafts">Drafts</span>
            <h1 className="Current"></h1>
          </div>
          <div>
            <span className="Current">Pending</span>
            <h1 className="Current"></h1>
          </div>
          <div>
            <span className="Current">On-Extension</span>
            <h1 className="Current"></h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
