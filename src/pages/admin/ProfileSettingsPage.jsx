import { motion } from "framer-motion";
import ProfileForm from "../../components/admin/ProfileForm";
import Loader from "../../components/shared/Loader";
import { useProfile } from "../../hooks/useProfile";

const ProfileSettingsPage = () => {
  const { profile, loading, refetch } = useProfile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Profile Settings</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Update your profile and portfolio details
        </p>
      </div>

      {loading ? <Loader /> : <ProfileForm profile={profile} onSuccess={refetch} />}
    </motion.div>
  );
};

export default ProfileSettingsPage;