export const USER_ROLES = {
  SUPER_ADMIN: "super admin",
  ADMIN: "admin",
  GUEST: "guest",
};

export const WORKFLOW_STATUS = {
  DRAFT: 1,
  IN_REVIEW: 2,
  APPROVED: 3,
  REJECTED: 4,
};

export const ADDITIONAL_ROLE = {
  AUTHOR: 1,
  REVIEWER: 2,
};

export const typeOfAreaApplication = [
  {
    id: 1,
    key: "video",
    label: "Video",
    value: 1,
  },
  {
    id: 2,
    key: "image",
    label: "Image",
    value: 2,
  },
  {
    id: 3,
    key: "icon",
    label: "Icon",
    value: 3,
  },
];

export const feedbackUserList = [
  {
    id: 1,
    value: "Customer feedback",
    label: "Customer feedback",
  },
  {
    id: 2,
    value: "User feedback",
    label: "User feedback",
  },
];

export const feedbackTypeList = [
  {
    id: 1,
    value: "Irrelevant results",
    label: "Irrelevant results",
  },
  {
    id: 2,
    value: "Incomplete info",
    label: "Incomplete info",
  },
  {
    id: 3,
    value: "Others",
    label: "Others",
  },
];

export const feedbackStatuses = [
  {
    id: 1,
    value: "pending",
    label: "Pending",
  },
  {
    id: 2,
    value: "resolved",
    label: "Resolved",
  },
];

export const filtersArr = [
  {
    name: "Feedback user type",
    items: feedbackUserList,
    keyName: "feedback_user_type",
  },
  {
    name: "Feedback type",
    items: feedbackTypeList,
    keyName: "feedback_type",
  },
  {
    name: "Feedback Status",
    items: feedbackStatuses,
    keyName: "feedback_status",
  },
];
