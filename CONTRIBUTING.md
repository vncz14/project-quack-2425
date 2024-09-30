this is a guide for my mentees on this project's development process

## trunk-based development

we will be using [**trunk-based development**](https://trunkbaseddevelopment.com/) with [**short-lived feature branches**](https://trunkbaseddevelopment.com/short-lived-feature-branches). this branching model works very well for CI/CD, and short-lived feature branches will allow me and your fellow mentees to know exactly what you are working on by participating in code review.

## issues (deciding what to code)

- a [github issue](https://github.com/vncz14/project-quack-2425/issues) should be created for every feature or bug that needs to be worked on in the app. 
- because feature branches should be short-lived according to the philosophy of trunk-based development, each issue should take around 1 day (full time 8 hour work day) of working, 2 days max, to complete. 
   - please keep this in mind when deciding how broad or specific an issue should be.
      - issues that are completed too quickly will create a backlog of pull requests.
      - issues that are completed too slowly will result in merge hell.
- ONE PERSON should be assigned to each issue.
  - please remember to assign yourself to an issue if you want to work on it.
- each person should work on ONE ISSUE at a time.

## branches (coding)

- use the issue page on the github website to create a branch for an issue, and checkout the branch on your machine
- only commit directly to feature branches. DO NOT commit directly to main.
- WRITE RELEVANT TESTS if applicable.

## pull requests (getting your code approved)

- as soon as you have completed the feature/bug outlined in the issue (and are passing tests if applicable), [create a pull request](https://github.com/vncz14/project-quack-2425/pulls) from your branch to main.
- pull requests must be approved by either me or a mentee on your team.
  - please indicate in the pull request who should review it (me, a specific mentee, any mentee, anyone, etc)

### reviewing a pull request
- ideally, you would run the relevant code on your own machine to see it for yourself
- comment on the pull requests if you have suggestions or improvements that need to be made before you would approve
- feature branches should be deleted after merging into main (this is the reviewer's responsibility)


## conclusion: communication

remember to communicate with me and your fellow mentees. things don't get done when people don't communicate. please raise any questions or concerns to me: that's why i'm here.

