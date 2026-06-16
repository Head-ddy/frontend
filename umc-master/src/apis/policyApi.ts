import { PolicyData } from '@pages/magazine/components/cardGrid';
import { prototypeHashtags, prototypePolicies } from '@mocks/prototypeData';

interface GetPoliciesParams {
  locationId: number;
}

export interface Policy {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  policy_url: string;
  image_url_list: string;
  magazine_likes: number;
  magazine_bookmarks: number;
  organization: {
    id: number;
    name: string;
    image: string;
  };
  location: {
    id: number;
    name: string;
  };
  hashtag: {
    id: number;
    name: string;
  }[];
}

export interface CreatePolicyParams {
  title: string;
  description: string;
  policy_url: string;
  location_id: number;
  image_url_list: string[];
  magazine_hashtag_id_list: number[];
}

export interface PolicyMutationParams {
  policyId: number;
  data: CreatePolicyParams;
}

export interface Hashtag {
  hashtag_id: number;
  name: string;
  popularity: number;
}

export const getPolicies = async (_params: GetPoliciesParams): Promise<PolicyData[]> => {
  void _params;
  return prototypePolicies;
};

export const getPolicyGuide = async ({ policyId }: { policyId: number }): Promise<Policy> =>
  (prototypePolicies.find((policy) => policy.id === policyId) || prototypePolicies[0]) as Policy;

export const createPolicy = async (data: CreatePolicyParams): Promise<Policy> => ({
  ...(prototypePolicies[0] as Policy),
  id: Date.now(),
  title: data.title,
  description: data.description,
  policy_url: data.policy_url,
});

export const updatePolicy = async ({ policyId, data }: PolicyMutationParams): Promise<Policy> => {
  const policy = (prototypePolicies.find((item) => item.id === policyId) || prototypePolicies[0]) as Policy;
  return {
    ...policy,
    title: data.title,
    description: data.description,
    policy_url: data.policy_url,
    image_url_list: data.image_url_list[0] || policy.image_url_list,
  };
};

export const deletePolicy = async (_params: { policyId: number }): Promise<boolean> => {
  void _params;
  return true;
};

export const getPopularHashtags = async ({ limit }: { limit: number }): Promise<Hashtag[]> =>
  prototypeHashtags.slice(0, limit);
