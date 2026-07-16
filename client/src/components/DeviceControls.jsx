function DeviceControls({
  search, onSearchChange, statusFilter, onStatusFilterChange,
  typeFilter, onTypeFilterChange, deviceTypes, sortBy, onSortByChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <div className="flex-1 min-w-55">
        <label htmlFor="device-search" className="sr-only">
          Search device ID or name
        </label>
        <input
          id="device-search"
          name="device-search"
          type="text"
          autoComplete="off"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search device ID, name..."
          className="w-full bg-surface-container-high border border-outline-variant text-on-surface rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-container focus:border-primary-container placeholder:text-on-surface-variant/50"
        />
      </div>

      <div>
        <label htmlFor="status-filter" className="sr-only">
          Filter by status
        </label>
        <select
          id="status-filter"
          name="status-filter"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="bg-surface-container-high border border-outline-variant text-on-surface rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-container"
        >
          <option value="All">Status: All</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>
      </div>

      <div>
        <label htmlFor="type-filter" className="sr-only">
          Filter by device type
        </label>
        <select
          id="type-filter"
          name="type-filter"
          value={typeFilter}
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className="bg-surface-container-high border border-outline-variant text-on-surface rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-container"
        >
          <option value="All">Type: All</option>
          {deviceTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="sort-by" className="sr-only">
          Sort devices by
        </label>
        <select
          id="sort-by"
          name="sort-by"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="bg-surface-container-high border border-outline-variant text-on-surface rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-container"
        >
          <option value="id">Sort: Device ID</option>
          <option value="name">Sort: Device Name</option>
          <option value="status">Sort: Status</option>
          <option value="location">Sort: Location</option>
        </select>
      </div>
    </div>
  );
}

export default DeviceControls;