/*
  Supabase integration removed

  The project previously used Supabase for persistence and realtime updates.
  Per repository owner's request, runtime Supabase usage has been removed.
  This file provides harmless stubs for the same exports so imports won't break,
  but none of these functions make network calls.
*/

// Minimal, safe stubs to avoid runtime errors if something still imports these
export async function fetchListings() {
  console.warn('fetchListings called: Supabase integration disabled. Returning null.');
  return null;
}

export async function createListing(_listing: any) {
  console.warn('createListing called: Supabase integration disabled.');
  return null;
}

export async function updateListing(_id: string, _updates: any) {
  console.warn('updateListing called: Supabase integration disabled.');
  return null;
}

export async function deleteListing(_id: string) {
  console.warn('deleteListing called: Supabase integration disabled.');
  return true;
}

export async function createUser(_user: any) {
  console.warn('createUser called: Supabase integration disabled.');
  return null;
}

export async function fetchUserByPhone(_phone: string) {
  console.warn('fetchUserByPhone called: Supabase integration disabled.');
  return null;
}

export function subscribeToListings(_callback: (payload: any) => void) {
  console.warn('subscribeToListings called: Supabase integration disabled. Returning noop subscription.');
  return {
    unsubscribe() {
      // noop
    },
  };
}
