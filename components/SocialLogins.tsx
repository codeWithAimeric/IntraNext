import { doSocialLogin } from "@/server/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const SocialLogins = () => {
    return (
        <form action={doSocialLogin} className="flex flex-col items-center space-y-4">
            <button
                className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                type="submit"
                name="action"
                value="google"
            >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                Sign In With Google
            </button>

            <button
                className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                type="submit"
                name="action"
                value="github"
            >
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                Sign In With GitHub
            </button>
        </form>
    );
};

export default SocialLogins;