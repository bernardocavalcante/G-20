export function isTimeSlotAvailable(agendas, newDate) {
  const newTime = newDate.getTime();
  for (let ag of agendas) {
    const agTime = ag.datetime.getTime
      ? ag.datetime.getTime()
      : new Date(ag.datetime).getTime();
    if (Math.abs(agTime - newTime) < 15 * 60 * 1000) {
      return false;
    }
  }
  return true;
}
