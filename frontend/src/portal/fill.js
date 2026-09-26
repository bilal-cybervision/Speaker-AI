export function fill(template, slots) {
  return template.replace(/\{\{([ta]\d+)\}\}/g, (full, key) =>
    Object.prototype.hasOwnProperty.call(slots, key) ? slots[key] : full
  );
}
