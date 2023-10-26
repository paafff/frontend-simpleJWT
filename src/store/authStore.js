import create from 'zustand';

const useAuthStore = create((set) => ({
  loggedIn: false,
  user: null,
  login: (user) => set({ loggedIn: true, user }),
  logout: () => set({ loggedIn: false, user: null }),
}));

useAuthStore.subscribe((state) => {
  // Simpan state ke localStorage
  localStorage.setItem('authUser', JSON.stringify(state.user));
});

const storedUser = localStorage.getItem('authUser');
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  useAuthStore.setState({ user: parsedUser });
}

export default useAuthStore;
