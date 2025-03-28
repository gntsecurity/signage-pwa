export function parseScheduleLayout(layout: any) {
  // Logic for parsing and validating schedule layout
  return layout.media.map((item: any) => ({
    type: item.type,
    src: item.src,
    duration: item.duration,
  }));
}
