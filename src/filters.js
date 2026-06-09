export function matches(tuition) {
  const salary = parseInt(tuition.salary || "0", 10);
  const days = parseInt(tuition.day || "999", 10);

  const wantedTeacher = (
    tuition.wantedTeacher || ""
  ).toLowerCase();

  const isMaleOnly =
    wantedTeacher.includes("male") &&
    !wantedTeacher.includes("female");

  return (
    tuition.isPublish === true &&
    salary >= 6000 &&
    days <= 3 &&
    isMaleOnly
  );
}