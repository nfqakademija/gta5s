<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 12/7/17
 * Time: 3:23 PM
 */

namespace AppBundle\EventListener;

use AppBundle\Entity\Account;
use AppBundle\Entity\Image;
use Oneup\UploaderBundle\Event\PostPersistEvent;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AvatarUploadListener
{

    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct(
        ContainerInterface $container
    ) {
        $this->container = $container;
    }

    public function onUpload(PostPersistEvent $event)
    {
        $em = $this->container->get('doctrine.orm.entity_manager');

        /* @var $account Account */
        $account = $this->container
            ->get('security.token_storage')
            ->getToken()
            ->getUser();

        if (!$account->isUsingDefaultAvatar()) {
            $account->getAvatar()->setFileName(
                $event->getFile()
            );
        } else {
            $avatar = new Image();
            $em->persist($avatar);

            $avatar->setFileName(
                $event->getFile()
            );

            $account->setAvatar($avatar);
        }

        $em->flush();

        $response = $event->getResponse();
        $response['success'] = false;
        $response['dbg'] = "h";
        return $response;
    }
}
