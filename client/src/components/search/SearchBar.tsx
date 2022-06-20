import SearchBar from "material-ui-search-bar";

function ProductSearchBar() {
  return (
    <SearchBar
    value={this.state.value}
    onChange={(newValue) => this.setState({ value: newValue })}
    onRequestSearch={() => (this.state.value)}
  />
  )
}
export default ProductSearchBar;