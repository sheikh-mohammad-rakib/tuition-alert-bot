export function matches(tuition) {
  const salary = parseInt(tuition.salary || "0", 10);
  const days = parseInt(tuition.day || "999", 10);

  const wanted = (tuition.wantedTeacher || "").toLowerCase();

  const maleOnly =
    wanted.includes("male") &&
    !wanted.includes("female");

  return (
    tuition.isPublish &&
    salary >= 6000 &&
    days <= 3 &&
    maleOnly
  );
}